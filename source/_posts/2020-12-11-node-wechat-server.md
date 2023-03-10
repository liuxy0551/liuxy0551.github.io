---
title: node 微信公众号开发（二）—— 服务器配置
urlname: node-wechat-server
tags:
  - node
  - 微信公众号
categories:
  - 前端
  - 微信公众号
author: liuxy0551
copyright: true
date: 2020-12-11 10:36:43
updated: 2020-12-11 10:36:43
---

&emsp;&emsp;最近想用 node 写一个微信公众号的项目，建议全程 https，这里记录一下怎么在微信公众号平台设置服务器及对应开发。

<!--more-->


### 一、开发内容

&emsp;&emsp;在刚刚搭建的基础框架中开发，`router/index.js`中写入如下代码：

``` javascript
/**
 * 模块化处理router
 */
const Router = require('koa-router')
const sha1 = require('sha1')
const appConfig = require('../app.config')

const router = new Router()

/**
 * 启动路由
 * allowedMethods, 在所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
 */
module.exports = app => {
  // 验证消息的确来自微信服务器
  router.get('/', ctx => {
    const { openid } = ctx.query
    if (openid) { // 用户给公众号发消息
      return ctx.body = ''
    }
    const { signature, timestamp, nonce, echostr } = ctx.query
    let str = [appConfig.Token, timestamp, nonce].sort().join('') // 按字典排序，拼接字符串
    let sha = sha1(str)
    ctx.body = (sha === signature) ? echostr : ''
  })

  app.use(router.routes(), router.allowedMethods())
}
```

### 二、服务器配置

![](https://liuxianyu.cn/image-hosting/posts/node-wechat/1.png)

&emsp;&emsp;如上图在`微信公众号管理平台 -> 开发 -> 基本设置 -> 服务器配置`中设置参数，注意`Token`字段需要与 <a href="https://liuxianyu.cn/article/node-wechat-base-koa.html#2-app-config-js" target="_black">app.config.js</a> 中的`Token`保持一致。`记得启用服务器配置`。配置后用户发给公众号的信息也会调用刚刚设置的服务器 URL，我这边暂时不对消息做处理，可依据 <a href="https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html" target="_black">官方文档建议</a>，先返回空字符串。

