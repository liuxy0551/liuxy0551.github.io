---
title: Vue 项目打包时自动把所有图片的本地路径改为 CDN 路径
urlname: vue-build-img-cdn
tags:
  - CDN
categories:
  - 前端
  - vue
  - 项目优化
author: liuxy0551
copyright: true
date: 2020-07-11 17:09:56
updated: 2020-07-11 17:09:56
---

&emsp;&emsp;vue-cli 3 + 在项目优化的时候，可以考虑把图片资源放到 CDN 上，减少对服务器带宽的压力。

<!--more-->

&emsp;&emsp;开发时，写的图片路径通常是相对路径，在 webpack 的配置中可以进行配置，配置后在打包时就可以自动将我们写的相对路径转换成 CDN 路径：
`@/assets/images/logo.png`或`../../assets/images/logo.png` -> `https://images-hosting.liuxianyu.cn/images`。


#### 1、vue.config.js

- 1、process.env.NODE_ENV 判断项目环境
- 2、相关选项写在了 url-loader 里, url-loader 的作用是将图片引用方式转换为 base64 的内联引用方式
- 3、配置 limit (默认 10000)，可使文件大小小于此 limit 值(单位为 byte)的文件转换为 base64 格式, 大于此 limit 的, 会执行 options 中的 fallback 配置项
- 4、fallback 默认值为 file-loader, 而且 url-loader 的 options 配置项也会被传递给 <a href="https://webpack.docschina.org/loaders/file-loader/#publicpath" target="_black">file-loader</a>


```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .module
      .rule("images")
      .test(/\.(jpe?g|png|gif)$/i)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
        publicPath: process.env.NODE_ENV === 'production' ? 'https://images-hosting.liuxianyu.cn/images' : '',
        outputPath: 'img',
        name: '[name].[ext]'
      })
      .end()
  }
}
```



#### 参考资料

&emsp;&emsp;1、<a href="https://www.cnblogs.com/skura23/p/10825795.html" target="_black">配置vue项目将打包后图片文件的引用路径改为cdn路径?</a>
&emsp;&emsp;2、<a href="https://webpack.docschina.org/loaders/url-loader/#fallback" target="_black">webpack url-loader</a>
&emsp;&emsp;3、<a href="https://webpack.docschina.org/loaders/file-loader/#publicpath" target="_black">webpack file-loader</a>
