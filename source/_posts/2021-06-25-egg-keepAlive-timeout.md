---
title: egg 设置 keepAliveTimeout 超时时间
urlname: egg-keepAlive-timeout
tags:
  - Serverless
  - 函数计算
categories:
  - Serverless
author: liuxy0551
copyright: true
date: 2021-06-25 23:19:19
updated: 2021-06-25 23:19:19
---


&emsp;&emsp;最近在阿里云函数计算中，Post 接口经常在紧密相邻的第二次调用时报错，`{ errorMessage: 'Process exited unexpectedly before completing request (duration: 1ms, maxMemoryUsage: 200.52MB) }`，这个错误经过测试是偶发必现的，比较影响体验，记录下解决方法。

<!--more-->


### 一、出现错误

&emsp;&emsp;这个项目在函数计算的部署环境是`Custom Runtime`，选用了`egg`框架。调用一个 Post 接口的时候，发现经常性的没有反应，查看日志后发现偶发遇到`502 bad gateway`的错误。查看函数计算的文档后发现有以下要求：

> **HTTP Server 配置要求**
> Connection 需要设置为 Keep-Alive，Server 端请求超时时间需设置在15分钟及以上。示例如下：
> ``` javascript
//例如Node.js使用express时
var server = app.listen(PORT, HOST)
server.timeout = 0 // never timeout
server.keepAliveTimeout = 0 // keepalive, never timeout
```


### 二、解决方法

&emsp;&emsp;从网上找到三种解决方法，下述前两种尝试后发现没有效果，错误依旧可复现。

#### 2.1 config.httpclient `无效`

&emsp;&emsp;修改`/config/config.default.js`文件：

``` javascript
config.httpclient = {
  request: {
    // 默认 request 超时时间
    timeout: 60000
  },

  httpAgent: {
    // 默认开启 http KeepAlive 功能
    keepAlive: true,
    // 空闲的 KeepAlive socket 最长可以存活 4 秒
    freeSocketTimeout: 0,
    // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
    timeout: 0,
    // 允许创建的最大 socket 数
    maxSockets: Number.MAX_SAFE_INTEGER,
    // 最大空闲 socket 数
    maxFreeSockets: 256
  },

  httpsAgent: {
    keepAlive: true,
    freeSocketTimeout: 0,
    timeout: 0,
    maxSockets: Number.MAX_SAFE_INTEGER,
    maxFreeSockets: 256
  }
}
```

&emsp;&emsp;可在 <a href="https://eggjs.org/zh-cn/core/httpclient.html#httpclient-%E9%BB%98%E8%AE%A4%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE" target="_blank">HttpClient 默认全局配置</a>、<a href="https://github.com/eggjs/egg/blob/master/config/config.default.js#L270" target="_blank">github -> config.default.js -> httpclient</a> 中查看文档。

>**注意**
> HttpClient 是发送 HTTP 请求的，而 timeout 和 keepAliveTimeout 是要设置到 egg 启动的 http server 上。

#### 2.2 config.clusterClient `无效`

&emsp;&emsp;修改`/config/config.default.js`文件：

``` javascript
config.clusterClient = {
  maxWaitTime: 60000,
  responseTimeout: 60000
}
```

&emsp;&emsp;可在 <a href="https://eggjs.org/zh-cn/advanced/cluster-client.html#%E5%9C%A8%E6%A1%86%E6%9E%B6%E9%87%8C%E9%9D%A2-cluster-client-%E7%9B%B8%E5%85%B3%E7%9A%84%E9%85%8D%E7%BD%AE%E9%A1%B9" target="_blank">在框架里面 cluster-client 相关的配置项</a>、<a href="https://github.com/eggjs/egg/blob/master/config/config.default.js#L366" target="_blank">github -> config.default.js -> clusterClient</a> 中查看文档。

#### 2.3 app.server `推荐`

&emsp;&emsp;APP 的生命周期函数中提供了`serverDidReady`方法，此时可以从`app.server`拿到 server 的实例。文档：<a href="https://eggjs.org/zh-cn/basics/app-start.html" target="_blank">启动自定义</a>。拿到 server 实例我们就可以设置 timeout 和 keepAliveTimeout。

&emsp;&emsp;根目录增加`app.js`文件，代码如下：

``` javascript
class AppBootHook {
  constructor(app) {
      this.app = app
  }
  async serverDidReady() {
      // http / https server 已启动，开始接受外部请求
      // 此时可以从 app.server 拿到 server 的实例
      this.app.server.timeout = 0
      this.app.server.keepAliveTimeout = 0
  }
}

module.exports = AppBootHook
```


#### 参考文章

[1] <a href="https://github.com/eggjs/egg/issues/4541" target="_black">egg Issue #4541 - egg 如此设置 keepAliveTimeout 超时时间不不起作用？</a>
[2] <a href="https://github.com/eggjs/egg/issues/4411" target="_black">egg Issue #4411 - egg 迁移到阿里云函数计算，使用post方式发送请求，第一个请求正常，相隔10秒后发第二个请求，egg崩溃</a>
