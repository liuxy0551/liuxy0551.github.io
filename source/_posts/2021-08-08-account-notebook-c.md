---
title: 账号簿开发（三）—— 微信小程序的云开发和云函数
urlname: account-notebook-c
tags:
  - 微信小程序
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2021-08-08 17:49:53
updated: 2021-08-08 17:49:53
---


&emsp;&emsp;微信小程序的云开发是腾讯云为小程序提供的开发能力，可以省去后端的工作，也可以节省很多运维的工作，有些类似于 Serverless 和之前学习的`函数计算`，官方文档：<a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html" target="_black">微信云开发</a>。云开发的初始入门可以看看哔站上的视频，入门够用了，推荐一个：<a href="https://www.bilibili.com/video/BV1pE411C7Ca" target="_black">认识云开发</a>。

<!--more-->

&emsp;&emsp;这是一个系列随笔，主要记录『账号簿』微信小程序的开发过程：
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook.html" target="_black">账号簿（微信小程序）的开发过程</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-a.html" target="_black">账号簿开发（一）—— 微信小程序 AES 加密解密</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-b.html" target="_black">账号簿开发（二）—— 微信小程序检查更新及调试</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-c.html" target="_black">账号簿开发（三）—— 微信小程序的云开发</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-d.html" target="_black">账号簿开发（四）—— 写一个随机密码生成器</a>  


### 一、云能力初始化

&emsp;&emsp;小程序端使用云能力前需要先完成初始化，<a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/init.html" target="_black">小程序端初始化</a>：

``` javascript
// app.js
onLoad() {
  wx.cloud.init({
    env: 'prod-32r233wer424as22fq',
    traceUser: true
  })
}
```


### 二、数据库

&emsp;&emsp;使用数据库前先获取数据库的引用

``` javascript
const DB = wx.cloud.database()
```

#### 2.1、增

``` javascript
  DB.collection('user').add({
    name: 'Tom',
    age: 18
  })
```

#### 2.2、改

``` javascript
  DB.collection('user').where({
    name: 'Tom'
  }).update({
    age: 20
  })
```

#### 2.3、查

``` javascript
  const user = await DB.collection('user').where({
    name: 'Tom'
  }).get()
  console.log(user) // { name: 'Tom', age: 20 }
```


### 三、云函数

&emsp;&emsp;云函数的优点有很多，比如在小程序端进行数据库插入时，会有条数限制，云函数则没有；天然鉴权，请求自带 openId 等等优势，和 Serverless 及之前学习的`函数计算`一致，官方文档：<a href="https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions.html" target="_black">云函数</a>。  
&emsp;&emsp;推荐哔站的一个云函数入门视频：<a href="https://www.bilibili.com/video/BV1pE411C7Ca?p=12" target="_black">开发者工具中新建云函数</a>。

&emsp;&emsp;代码参考：<a href="https://github.com/liuxy0551/account-notebook/tree/master/cloud" target="_black">获取用户 openId</a>
