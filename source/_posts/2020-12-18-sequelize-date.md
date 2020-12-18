---
title: sequelize 日期格式化
urlname: sequelize-date
tags:
  - node
  - sequelize
categories:
  - node
  - sequelize
author: liuxy0551
copyright: true
date: 2020-12-18 14:58:33
updated: 2020-12-18 14:58:33
---

&emsp;&emsp;最近 koa2 项目中用到的 ORM 是 sequelize，查询时返回的时间格式是`2020-12-18T09:11:12.668Z`，希望得到的是`YYYY-MM-dd HH:mm:ss`，记录一下处理过程。

<!--more-->


``` javascript
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
