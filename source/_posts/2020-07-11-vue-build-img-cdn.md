---
title: Vue 项目打包时自动把所有图片的本地路径改为 CDN 路径
urlname: vue-build-img-cdn
tags:
  - 项目优化
  - CDN
categories:
  - 前端
  - Vue
  - CDN
author: liuxy0551
copyright: true
hidden: true
date: 2020-07-11 17:09:56
updated: 2020-07-11 17:09:56
---

&ensp;&ensp;&ensp;&ensp;vue-cli 3 + 在项目优化的时候，可以考虑把图片资源放到 CDN 上，减少对服务器带宽的压力。

<!--more-->

&ensp;&ensp;&ensp;&ensp;开发时，写的图片路径通常是相对路径，在 webpack 的配置中可以进行配置，配置后在打包时就可以自动将我们写的相对路径转换成 CDN 路径：
`@/assets/images/logo.png`或`../../assets/images/logo.png` -> `http://media.liuxianyu.cn/images`


#### 1、publicPath

&ensp;&ensp;&ensp;&ensp;webpack 中，`publicPath`可以修改项目中静态文件的引用路径，尝试修改：
```javascript
// vue.config.js
module.exports = {
  publicPath: 'http://media.liuxianyu.cn/images'
}
```
&ensp;&ensp;&ensp;&ensp;但是这样修改`publicPath`会使所有的静态文件都变成这个路径，包括 js，css，img 等，如果需要仅针对 img 类型的文件，
那就需要在`chainWebpack`里修改图片类型文件的`file-loader`配置项，单独配置 img 类型文件的`publicPath`。


#### 2、chainWebpack

