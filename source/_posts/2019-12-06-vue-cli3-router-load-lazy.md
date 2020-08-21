---
title: 前端项目优化之旅（五）—— Vue 路由懒加载
urlname: vue-cli3-router-load-lazy
tags:
  - Vue
  - 项目优化
categories:
  - 前端
  - Vue
  - 路由懒加载
author: liuxy0551
copyright: true
date: 2019-12-06 11:34:19
updated: 2019-12-06 11:34:19
---

&ensp;&ensp;&ensp;&ensp;`前端项目优化之旅`系列随笔主要记录工作中遇到的一些优化方案，这里记录一下 Vue 中的路由懒加载。

<!--more-->


### 一、为什么

&ensp;&ensp;&ensp;&ensp;打包构建后，运用 webpack 打包后的文件变得非常大，在用户进入首页时，需要加载整个项目的资源，时间过长。即使做了 loading 或者骨架屏也不利于用户体验。


### 二、怎么办

&ensp;&ensp;&ensp;&ensp;如果能把不同路由对应的组件分割成不同的代码块，在路由被访问时才加载对应组件，能有效减小首页的加载压力。但是当跳转到新页面的时候，需要等待新页面 js 文件的加载，体验会变差。

　　`router.js`：

``` javascript
{ path: '/element', name: 'Element', component: () => import('../src/pages/element') }                        // 新写法，推荐
{ path: '/element', name: 'Element', component: resolve => { require(['../src/pages/element'], resolve) }}    // 旧写法
```

### 三、webpackPrefetch

&ensp;&ensp;&ensp;&ensp;在 Vue CLI 3 中我们还可以再做一步：因为 Vue CLI 3 默认开启了`prefetch`（预加载模块），用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。所以要关闭这个功能，在`vue.config.js`中设置：

``` javascript
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改 prefetch 的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
}
```

&ensp;&ensp;&ensp;&ensp;当`prefetch`插件被禁用时，可以通过 webpack 的内联注释手动选定要提前获取的代码区块：

``` javascript
{ path: '/element', name: 'Element', component: () => import(/* webpackPrefetch: true */ '../src/pages/element') }
```
