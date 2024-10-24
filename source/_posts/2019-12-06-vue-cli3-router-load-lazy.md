---
title: 前端项目优化之旅（五）—— Vue 路由懒加载、组件懒加载
urlname: vue-cli3-router-load-lazy
tags:
  - vue
categories:
  - 前端
  - vue
  - 项目优化
author: liuxy0551
copyright: true
date: 2019-12-06 11:34:19
updated: 2019-12-06 11:34:19
---

&emsp;&emsp;`前端项目优化之旅`系列随笔主要记录工作中遇到的一些优化方案，这里记录一下 Vue 中的路由懒加载。

<!--more-->


&emsp;&emsp;可以看看官方文档：<a href="https://router.vuejs.org/zh/guide/advanced/lazy-loading.html" target="_black">Vue Router 路由懒加载</a>，写得浅显易懂。

### 一、为什么

&emsp;&emsp;打包构建后，运用 webpack 打包后的文件变得非常大，在用户进入首页时，需要加载整个项目的资源，时间过长。即使做了 loading 或者骨架屏也不利于用户体验。


### 二、路由懒加载

&emsp;&emsp;如果能把不同路由对应的组件分割成不同的代码块，在路由被访问时才加载对应组件，能有效减小首页的加载压力。但是当跳转到新页面的时候，需要等待新页面 js 文件的加载，体验会变差。

&emsp;&emsp;`router.js`：

``` javascript
export default new VueRouter({
  routes: [
    { path: '/', component: () => import(/* webpackChunkName: 'home-group' */ '../views/home') }
  ]
})
```

&emsp;&emsp;搭配 Vue 异步组件和 Webpack 的代码分割功能`webpackChunkName`实现懒加载，参考：<a href="https://github.com/liuxy0551/my-vue/blob/master/src/router.js" target="_black">router.js</a>。

### 三、组件懒加载

``` javascript
const Navigator = () => import(/* webpackChunkName: 'home-group' */ '../components/Navigator')
...
components: { Navigator }
```


### 四、webpackPrefetch

&emsp;&emsp;在 Vue CLI 3 中我们还可以再做一步：因为 Vue CLI 3 默认开启了`prefetch`（预加载模块），用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。可以考虑关闭这个功能，在`vue.config.js`中设置：

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

&emsp;&emsp;当`prefetch`插件被禁用时，可以通过 webpack 的内联注释手动选定要提前获取的代码区块：

``` javascript
{ path: '/element', name: 'Element', component: () => import(/* webpackPrefetch: true */ '../src/pages/element') }
```
