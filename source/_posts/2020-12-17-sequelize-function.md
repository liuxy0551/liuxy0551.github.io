---
title: Sequelize 中常用的一些方法和参数
urlname: sequelize-function
tags:
  - node
  - Sequelize
categories:
  - node
  - Sequelize
author: liuxy0551
copyright: true
date: 2020-12-17 09:52:01
updated: 2020-12-17 09:52:01
---

&emsp;&emsp;最近 koa2 项目中用到的 ORM 是 Sequelize V6，记录一下相关知识点。

<!--more-->

&emsp;&emsp;<a href="https://www.sequelize.com.cn/" target="_black">Sequelize 中文文档</a>、<a href="https://itbilu.com/nodejs/npm/V1PExztfb.html" target="_black">Sequelize 中文API文档－2. Model 的定义、使用与Model类的API</a>


### 一、常用方法

#### 1、findAll

&emsp;&emsp;findAll 从数据库读取整个表：

``` javascript
const user = await User.findAll()
SELECT * FROM User;
```

##### （1）SELECT 特定属性`attributes`

&emsp;&emsp;选择某些特定属性，可以使用`attributes`参数：

``` javascript
User.findAll({
  attributes: ['name', 'age']
})
SELECT name, age FROM User;
```

&emsp;&emsp;可以使用嵌套数组来重命名属性：

``` javascript
User.findAll({
  attributes: ['name', ['age', 'ageage'], 'hats']
})
SELECT name, age AS ageage, hats FROM User;
```

&emsp;&emsp;可以使用`sequelize.fn`进行聚合。使用聚合函数时，必须为它提供一个别名，以便能够从 Model 中访问它。在下面的示例中，可以通过`instance.n_hats`获取帽子数量：

``` javascript
User.findAll({
  attributes: [
    'name',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    'age'
  ]
})
SELECT name, COUNT(hats) AS n_hats, age FROM User;
```

&emsp;&emsp;不用列出所有属性，也可以使用聚合：

``` javascript
User.findAll({
  attributes: {
    include: [
      [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
    ]
  }
})
SELECT name, age, ..., hats, COUNT(hats) AS n_hats FROM User;
```

&emsp;&emsp;同时，也可以排除部分属性：

``` javascript
User.findAll({
  attributes: {
    include: [
      [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
    ],
    exclude: ['age']
  }
})
SELECT name, ..., hats, COUNT(hats) AS n_hats FROM User;
```

##### （2）应用 WHERE 子句

&emsp;&emsp;`where` 用于过滤查询，`where`有很多运算符，可以从`Op`中以 Symbols 的形式使用。

``` javascript
User.findAll({
  where: {
    name: 'Tom',
    age: 20
  }
})
SELECT * FROM User WHERE name = 'TOM' AND age = 20;
```

&emsp;&emsp;`OR`

``` javascript
const { Op } = require('sequelize')
User.findAll({
  where: {
    [Op.or]: [
      { name: 'Tom' },
      { age: 20' }
    ]
  }
})
SELECT * FROM User WHERE name = 'TOM' OR age = 20;
```

&emsp;&emsp;`IN`

``` javascript
const { Op } = require('sequelize')
User.findAll({
  where: {
    name: ['Tom', 'Mary'] // 等同于：name: { [Op.or]: ['Tom', 'Mary'] }
  }
})
SELECT * FROM User WHERE name = 'TOM' OR age = 20;
```

&emsp;&emsp;更多`Op`操作符参见文档：<a href="https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E6%93%8D%E4%BD%9C%E7%AC%A6" target="_black">操作符</a>

##### （3）排序和分组

&emsp;&emsp;<a href="https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E6%8E%92%E5%BA%8F%E5%92%8C%E5%88%86%E7%BB%84" target="_black">排序和分组</a>

##### （4）限制和分页

&emsp;&emsp;使用`limit`和`offset`参数可以进行限制和分页，通常与`order`排序一起使用：

``` javascript
// 提取10行
User.findAll({ limit: 10 })

// 跳过8行
User.findAll({ offset: 8 })

// 跳过5行，然后获取5行
User.findAll({ offset: 5, limit: 5 })
```

##### （5）返回原始数据

&emsp;&emsp;默认情况下，返回的是模型类的实例，这意味着在数据库返回结果之后，Sequelize 会自动将所有内容包装在适当的实例对象中。当结果太多时，这种包装可能会效率低下，要禁用此包装并收到简单的响应，请将`{ raw: true }`作为参数传递给方法。

``` javascript
// 增加 raw 选项后，会返回数据库中的原始结果
User.findAll({ where: { ... }, raw: true })
```

#### 2、count

``` javascript
// 查询 age = 20 的用户数量
const total = await User.count({
  where: {
    age: 20
  }
})
```

#### 3、findByPk

&emsp;&emsp;`findByPk`方法使用提供的主键从表中仅获得一行数据：

``` javascript
const user = await User.findByPk(1024) // 主键的值是 1024
```

#### 4、findOne

&emsp;&emsp;`findOne`方法获得它找到的`第一行`数据：

``` javascript
const user = await User.findOne({ where: { name: 'Tom' } })
```

#### 5、findOrCreate

&emsp;&emsp;除非找到一个满足查询参数的结果,否则`findOrCreate`将在表中创建一行。具体参考：<a href="https://www.sequelize.com.cn/core-concepts/model-querying-finders#findorcreate" target="_black">findOrCreate</a>


#### 6、findAndCountAll`推荐`

&emsp;&emsp;结合了`findAll`和`count`的便捷方法。具体参考：<a href="https://www.sequelize.com.cn/core-concepts/model-querying-finders#findandcountall" target="_black">findAndCountAll</a>。findAndCountAll 方法返回有两个属性的对象：
- count —— 整数，符合查询条件的记录总数
- rows —— 数组对象，获得的记录

``` javascript
const { count, rows } = await User.findAndCountAll({
  where: {
    name: {
      [Op.like]: 'T%'
    }
  },
  offset: 10,
  limit: 2
})
console.log(count)
console.log(rows)
```


### 二、作用域

&emsp;&emsp;<a href="https://www.sequelize.com.cn/other-topics/scopes" target="_black">作用域用于帮助复用代码</a>
