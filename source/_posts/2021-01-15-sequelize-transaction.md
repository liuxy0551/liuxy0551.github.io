---
title: Sequelize 中的事务（托管事务）
urlname: transaction
tags:
  - node
  - Sequelize
categories:
  - node
  - Sequelize
author: liuxy0551
copyright: true
date: 2021-01-15 15:35:31
updated: 2021-01-15 15:35:31
---

&emsp;&emsp;最近 koa2 项目中用到的 ORM 是 Sequelize V6，用户第一次登录时会在用户表、积分表、账本表等多个表中添加数据，还有其他场景，记录一下 Sequelize 中的事务如何使用，重点是`托管事务`。

<!--more-->


### 一、事务的定义

&emsp;&emsp;网上关于事务的定义有很多，简单理解为以下几点：

- 原子性：事务中的全部操作在数据库中是不可分割的，要么全部完成，要么全部不执行。
- 一致性：几个并行执行的事务，其执行结果必须与按某一顺序 串行执行的结果相一致。
- 隔离性：事务的执行不受其他事务的干扰，事务执行的中间结果对其他事务必须是透明的。
- 持久性：对于任意已提交事务，系统必须保证该事务对数据库的改变不被丢失，即使数据库出现故障。


### 二、Sequelize 中的事务

&emsp;&emsp;默认情况下，Sequelize 不使用事务，正常情况下生产环境是应该使用事务的。Sequelize 中支持两种使用方式，推荐`托管事务`：

#### 1、非托管事务

&emsp;&emsp;可参考：<a href="https://www.sequelize.com.cn/other-topics/transactions#%E9%9D%9E%E6%89%98%E7%AE%A1%E4%BA%8B%E5%8A%A1" target="_black">非托管事务</a>

#### 2、托管事务

&emsp;&emsp;托管事务会自动处理提交或回滚事务，通过将回调传递给`sequelize.transaction`来启动托管事务，这个回调可以是`async`的(通常是的)。在这种情况下，将发生以下情况：

- Sequelize 将自动开始事务并获得事务对象`t`
- 将执行提供的回调，并在其中传递`t`
- 如果回调抛出错误，Sequelize 将自动回滚事务
- 如果回调成功，Sequelize 将自动提交事务

<br>

&emsp;&emsp;`sequelize.transaction`调用的两种结果：
- 1、回调执行完成
- 2、如果回调引发错误，则拒绝执行回调并抛出错误

``` javascript
try {
  const result = await sequelize.transaction(async t => {
    const user = await User.create({
      firstName: 'Abraham',
      lastName: 'Lincoln'
    }, { transaction: t })

    await user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, { transaction: t })

    return user
  })

  // 如果执行到此，则表示事务已成功提交，result 是事务返回的结果，在这种情况下为 `user`
} catch (error) {
  // 如果执行到此，则发生错误，该事务已由 Sequelize 自动回滚。
}
```

>**注意**
**`t.commit()`和`t.callback()`没有被直接调用。**


#### 3、抛出错误以回滚

&emsp;&emsp;使用托管事务时，不应手动执行`t.commit()`和`t.callback()`，如果回调成功，依旧想回滚事务，可手动抛出错误：

``` javascript
await sequelize.transaction(async t => {
  const user = await User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, { transaction: t })

  // 查询成功，但仍要回滚，
  // 手动抛出错误，以便 Sequelize 自动处理所有内容.
  throw new Error();
});
```


### 参考资料

<a href="https://www.sequelize.com.cn/other-topics/transactions" target="_black">Sequelize 事务</a>

