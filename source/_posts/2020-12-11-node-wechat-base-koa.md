---
title: node 微信公众号开发（一）—— 基础框架
urlname: node-wechat-base-koa
tags:
  - node
  - 微信公众号
categories:
  - 前端
  - 微信公众号
author: liuxy0551
copyright: true
date: 2020-12-11 09:50:43
updated: 2020-12-11 09:50:43
---

&emsp;&emsp;最近想用 node 写一个微信公众号的项目，建议全程 https，这里记录一下基础框架的搭建。

<!--more-->


### 一、基于 koa2

#### 1、安装 koa 相关包

```
npm i koa koa-bodyparser koa-compress koa-logger koa-router -S
```

#### 2、Package 说明

* koa # 主程
* koa-router # 路由
* koa-logger # 日志
* koa-compress # 压缩响应
* koa-bodyparser # 获取 post 请求的参数


### 二、基础结构

#### 1、项目结构

&emsp;&emsp;目前项目未完成，仅供初始参考。

```
jizhangla-api
├─controller —— 控制器
| ├─User.js
| └─Wechat.js
├─middleWares —— 中间件目录
| ├─code.js —— 统一处理返回的 ctx.body
| ├─error.js —— 错误处理
| └─index.js
├─model —— 模型
| ├─user.js
| └─wechat.js
├─mysql —— MySQL 执行 sql 文件相关方法
| ├─README.md
| ├─index.js
| ├─util
| | ├─db.js
| | ├─get-sql-content-map.js
| | ├─get-sql-map.js
| | └─walk-file.js
| ├─sql
| | └─base-table.sql
├─pm2
| ├─config.json —— pm2 配置文件
| ├─logs —— pm2 输出日志
| | ├─pm2-err.log —— 错误日志
| | └─pm2-out.log —— 输出日志
├─router —— 路由
| ├─index.js
| ├─user.js —— 用户相关
| └─wechat.js —— 微信相关
├─utils
| ├─uuid.js —— 生成 uuid
| ├─wechat —— 微信相关方法目录
| | ├─access_token.json —— 暂存 access_token
| | ├─getAccessToken.js —— 获取 access_token
| | ├─getTicket.js —— 暂存 ticket
| | ├─sign.js —— 微信鉴权签名算法
| | └─ticket.json —— 获取 ticket
├─app.config.js —— 配置文件
├─app.js —— 入口文件
├─package.json
├─README.md —— README
└─start.sh —— 服务器部署脚本文件
```

#### 2、app.js

``` javascript
const Koa = require('koa')
const logger = require('koa-logger')
const compress = require('koa-compress')
const bodyParser = require('koa-bodyparser')
const appConfig = require('./app.config')
const middles = require('./middleWares')
const router = require('./router')

const app = new Koa()

// 配置中间件，通过 bodyParser 获取 post 请求传递过来的参数
app.use(bodyParser())

app.use(logger())
app.use(compress({
  threshold: 1024 // 超过大小即压缩，bytes
}))

// 启动自定义中间件
middles(app)

// 启动路由
router(app)

// app错误监听
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort, () => {
  console.log(`app runs on port ${ appConfig.appPort }`)
})
```

#### 2、app.config.js

``` javascript
/**
 * 配置文件
 */
module.exports = {
  appPort: 9002, // 服务端口

  Token: 'liuxy0551', // 公众号平台 - 开发 - 基本配置/填写服务器配置
  appId: 'wx9a4ad27276******',
  appSecret: '********************************', // 重要，不可公开
  wxapiBaseUrl: 'https://api.weixin.qq.com/cgi-bin' // 请求微信信息时微信服务器的地址
}
```

#### 3、middleWares/code.js

``` javascript
/**
 * ctx code 设置
 * @param  ctx koa ctx
 * @param next koa next 
 */
module.exports = async (ctx, next) => {
  ctx.body = { code: 200, message: '成功' }
  await next()
}
```

#### 4、middleWares/error.js

``` javascript
/**
 * 错误处理中间件，放在所有中间件之前，就可以捕获它们所有的同步或者异步代码中抛出的异常
 * @param  ctx koa ctx
 * @param next koa next 
 */
module.exports = async (ctx, next) => {
  try {
    // Node标识
    ctx.set('X-Proxy', 'Node Server')
    await next()
  } catch (err) {
    console.log('err', err)
    ctx.status = err.status || 500
    ctx.body = 'We are sorry. Internal server error occurred.'
    ctx.app.emit('error', err, ctx)
  }
}
```

#### 5、middleWares/index.js

``` javascript
/**
 * @file 中间件集合
 */
const errorMiddleWare = require('./error')
const codeMiddleWare = require('./code')

/**
 * 中间件
 */
module.exports = (app) => {
  // error 放在所有中间件之前，就可以捕获它们所有的同步或者异步代码中抛出的异常
  // codeMiddleWare 放在所有中间件之后
  const middleWares = [errorMiddleWare, codeMiddleWare]
  
  middleWares.forEach((middleware) => {
    app.use(middleware)
  })
}
```
