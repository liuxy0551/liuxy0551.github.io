---
title: nuxt 中使用 vue-lazyload 进行图片懒加载
urlname: nuxt-vue-lazy-load
tags:
  - nuxt
categories:
  - 前端
  - nuxt
author: liuxy0551
copyright: true
date: 2020-09-16 15:44:46
updated: 2020-09-16 15:44:46
---



&emsp;&emsp;最近用 nuxt 写了个 SSR 的页面，有很多图片展示，使用了图片懒加载，记录一下。

<!--more-->



### 一、依赖版本

1、[nuxt v2.14.5](https://www.npmjs.com/package/nuxt)
2、[vue-lazyload v1.3.3](https://www.npmjs.com/package/vue-lazyload)



### 二、实现过程

#### 1、安装

```
npm i vue-lazyload -D
```

#### 2、引入

&emsp;&emsp;在`plugins`目录下新建一个`vueLazyLoad.js`，内容如下：

```
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  preLoad: 1.33, // 预加载的宽高比，4:3
  error: '/default.jpg', // 加载失败时使用的图片
  loading: '/default.jpg', // 加载时的loading图
  attempt: 2 //尝试加载次数
})
```

&emsp;&emsp;在`nuxt.config.js`中配置插件：

```
  plugins: [
    { src: '~plugins/vueLazyLoad', ssr: false }
  ]
```


#### 3、使用

&emsp;&emsp;将需要懒加载处的`:src`属性改为`v-lazy`，刷新页面，即可看到效果。
