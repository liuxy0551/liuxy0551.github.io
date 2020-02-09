---
title: 移动端调试神器 - vConsole
urlname: mobile-vConsole
tags:
  - vConsole
categories:
  - 前端
  - vConsole
author: liuxy0551
copyright: true
date: 2018-09-07 10:31:05
updated: 2018-09-07 10:31:05
---

## 介绍

　　移动端进行真机调试时，可以使用`vConsole`查看部分调试信息，功能基本够用。记录一下使用方法。
[https://github.com/Tencent/vConsole](https://github.com/Tencent/vConsole)

<!--more-->


### 一、webpack 版插件`推荐`

#### 1、安装
``` shell
npm install vconsole-webpack-plugin -D
```

#### 2、使用

　　Vue CLI 3 中可以在`vue.config.js`中设置：

``` javascript
// 引入 vConsole 插件
const vConsole = require('vconsole-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new vConsole({
        filter: [],     // 需要过滤的入口文件
        enable: process.env.NODE_ENV === 'development'      // 生产环境不打开
      })
    ]
  }
}
```
>**注意**
>* **修改`vue.config.js`文件需要重启项目**


### 二、vConsole

#### 1、安装
``` shell
npm install vconsole -D
```

#### 2、使用

　　在`main.js`中写道：

``` javascript
import VConsole from 'vconsole'
const vConsole = new VConsole()
Vue.use(vConsole)
```
