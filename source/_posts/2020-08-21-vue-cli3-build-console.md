---
title: vue-cli3 打包时去除 console.log
urlname: vue-cli3-build-console
tags:
  - vue
categories:
  - 前端
  - vue
author: liuxy0551
copyright: true
date: 2020-08-21 11:39:22
updated: 2020-08-21 11:39:22
---

&emsp;&emsp;通过 terser-webpack-plugin 可以在打包时去除 console.log，记录一下实现。

<!--more-->


### 1、安装

```
npm i terser-webpack-plugin -D
```


### 2、配置

&emsp;&emsp;在`vue.config.js`中添加如下配置：

```javascript
module.export = {
  configureWebpack: config => {
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = process.env.NODE_ENV === 'production'
  }
}
```

- configureWebpack 加上 config 的写法会影响到 <a href="https://liuxianyu.cn/article/vue-cli3-cdn.html#2-vue-config-js" target="_black">vue.config.js</a> 中 externals 的使用，更改写法即可：

```javascript
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      vant: 'vant'
    }
  }
```
