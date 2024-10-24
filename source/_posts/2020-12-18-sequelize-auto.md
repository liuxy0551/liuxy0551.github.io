---
title: koa2 中使用 sequelize-auto 自动生成 models
urlname: sequelize-auto
tags:
  - node
  - Sequelize
categories:
  - node
  - Sequelize
author: liuxy0551
copyright: true
date: 2020-12-18 11:43:31
updated: 2020-12-18 11:43:31
---

&emsp;&emsp;最近 koa2 项目中用到的 ORM 是 Sequelize V6，建好表后可以使用`sequelize-auto`自动生成每个表对应的 Model。

<!--more-->

&emsp;&emsp;<a href="https://github.com/sequelize/sequelize-auto" target="_black">GitHub：sequelize-auto</a>


### 一、安装依赖

&emsp;&emsp;项目中使用的 Mysql 5.7，安装`sequelize-auto`和`MySQL`依赖：

```
npm i mysql -S
npm i sequelize-auto -D
```

&emsp;&emsp;在`package.json`中的`script`添加命令：

``` json
"scripts": {
  "dev": "export NODE_ENV=development && nodemon app.js",
  "models": "export NODE_ENV=development && node utils/mysql/sequelize-auto/auto.js"
}
```


### 二、配置参数

#### db.config.js

``` javascript
module.exports = {
  host : '127.0.0.1',
  user : 'root',
  password : '123456',
  database : 'jizhangla',
  port: 3306,
  dialect: 'mysql'
}
```

#### auto.js

``` javascript
// utils/mysql/sequelize-auto/auto.js
const SequelizeAuto = require('sequelize-auto')
const { host, user, password, database, dialect, port } = require('../../../db.config')

const options = {
  host,
  dialect,
  directory: 'models',  // 指定输出 models 文件的目录
  port,
  additional: {
    timestamps: false
  }
}
const auto = new SequelizeAuto(database, user, password, options)

auto.run(err => {
  if (err) throw err
})
```

&emsp;&emsp;执行`npm run models`，将自动在`models`文件夹下生成每个表对应的 Model，并生成`init-models.js`。

#### db.js

&emsp;&emsp;在`utils/mysql`下新增`db.js`文件，内容如下：

``` javascript
const Sequelize = require('sequelize')
const initModels = require('../../models/init-models')
const { host, user, password, database, dialect } = require('../../db.config')
const sequelize = new Sequelize(database, user, password, { host, dialect, define: { timestamps: false } })

module.exports = initModels(sequelize)
```


### 三、使用

``` javascript
const db = require('../utils/mysql/db')
const userInfo = await db.User.findOne({ where: isDelete: 0 })
```

