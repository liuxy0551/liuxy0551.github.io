---
title: Sequelize 日期格式化
urlname: sequelize-date
tags:
  - node
  - Sequelize
categories:
  - node
  - Sequelize
author: liuxy0551
copyright: true
date: 2020-12-18 14:58:33
updated: 2020-12-18 14:58:33
---

&emsp;&emsp;最近 koa2 项目中用到的 ORM 是 Sequelize V6，查询时返回的时间格式是`2020-12-18T09:11:12.668Z`，希望得到的是`YYYY-MM-dd HH:mm:ss`，记录一下处理过程。

<!--more-->


### 一、统一配置项 `推荐`

&emsp;&emsp;添加`dialectOptions`配置项，并设置`dateStrings`、`typeCast`两个参数的值为 true，如下：

``` javascript
const { host, user, password, database, dialect, timezone, logging } = require('../../../config/db.config')
const options = {
    host,
    dialect,
    define: {
        timestamps: false
    },
    timezone,
    logging,
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    } 
}
const sequelize = new Sequelize(database, user, password, options)
```

### 二、方法转换 `不推荐`

``` javascript
const sequelize = require('sequelize')

const userInfo = await db.User.findOne({
  where,
  attributes: {
    exclude: ['isDelete', 'openId', 'password'],
    include: [
      [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createTime'), '%Y-%m-%d %H:%i:%s'), 'createTime'],
      [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('updateTime'), '%Y-%m-%d %H:%i:%s'), 'updateTime'],
    ]
  }
})
```
