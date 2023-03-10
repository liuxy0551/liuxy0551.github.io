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
updated: 2020-03-30 11:43:50
---


&emsp;&emsp;移动端进行真机调试时，可以使用`vConsole`查看部分调试信息，功能基本够用。记录一下使用方法。

<!--more-->


### 一、vConsole - js 控制

#### 1、文档
[github](https://github.com/Tencent/vConsole)、[中文文档](https://github.com/Tencent/vConsole/blob/dev/README_CN.md)、[使用教程](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md)

#### 2、安装
``` shell
npm i vconsole -D
```

#### 3、简单使用

　　在`main.js`中写道：
``` javascript
import VConsole from 'vconsole'
const vConsole = new VConsole()
Vue.use(vConsole)
```

#### 4、灵活使用 `推荐`

　　生产环境可能出现一些调试问题，除去抓包的方法外，可以使用 vConsole：写一个`vConsole.js`文件，在`App.vue`中使用。
``` javascript
// vConsole.js
export default {
  vConsole: null,
  // 打开 vConsole
  open () {
    let ids = [148, 488] // 书明，刘易
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let isPC = localStorage.getItem('isPC') === 'true'
  
    // PC 端打开页面时不需要打开 vConsole
    if (isPC) {
      return
    }
  
    if (process.env.NODE_ENV === 'production') {
      if (!/test/.test(process.env.VUE_APP_BASE_URL)) { // 正式服
        if (!ids.includes(userInfo && userInfo.id)) { // 正式服不包含测试和开发则不打开
          return
        }
      }
    }
  
    let VConsole = require('vconsole/dist/vconsole.min.js')
    this.vConsole = new VConsole()
  }
}
```
``` javascript
// App.vue
import vConsole from "@/utils/vConsole"

export default {
  mounted() {
    vConsole.open()
  }
}
```


### 二、webpack 版插件

#### 1、安装
``` shell
npm i vconsole-webpack-plugin -D
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



### 三、通过 CDN 引入

``` html
<script src="http://wise-job.oss-cn-zhangjiakou.aliyuncs.com/webjs/libs/vConsole/vconsole.3.3.4.min.js"></script>
```
