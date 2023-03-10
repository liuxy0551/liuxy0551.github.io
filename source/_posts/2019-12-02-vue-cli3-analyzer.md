---
title: 前端项目优化之旅（一）—— 分析插件
urlname: vue-cli3-analyzer
tags:
  - Vue
  - 项目优化
categories:
  - 前端
  - Vue
author: liuxy0551
copyright: true
date: 2019-12-02 13:06:10
updated: 2019-12-02 13:06:10
---


　　上个月有好几个项目需要部署上线，其中有一个项目需要在钉钉第三方应用市场上线，而钉钉对于页面性能、白屏率等有硬性要求，所以对这个项目做了很多打包优化。
`前端项目优化之旅`将以基于 Vue CLI 3 新写的 [vue-cli3-build-optimization](https://github.com/liuxy0551/vue-cli3-build-optimization) 作为记录对象，记录一些优化方法：
<!--more-->


### 分析工具

　　在优化之前，我们需要知道项目构建后，哪里显得臃肿、哪些文件过大、哪些可以删除等等。这个时候，可视化的分析工具就显得很重要了。

#### 1、安装分析插件

　　安装`webpack-bundle-analyzer`：

``` shell
npm i webpack-bundle-analyzer
```

　　有以下两种配置方案，推荐第一种

#### 2、运行指定命令查看`推荐`

　　将分析插件作为一个独立的 script，在`package.json -> scripts`中添加一行`"analyzer": "use_analyzer=true npm run serve"`：

``` javascript
package.json
"scripts": {
  ...
  "analyzer": "use_analyzer=true npm run serve"
}
```

　　在 vue.config.js 中对 webpack 进行配置：

``` javascript
module.exports = {
  chainWebpack: config => {
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
```

　　这样只会在使用以下命令时才会自动打开浏览器并访问 [http://127.0.0.1:8888](http://127.0.0.1:8888/)

``` shell
npm run analyzer
```

#### 3、运行即查看

　　在 vue.config.js 中对 webpack 进行配置：

``` javascript
module.exports = {
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
```

　　接下运行`npm run serve`即可，会自动打开浏览器并访问 [http://127.0.0.1:8888](http://127.0.0.1:8888/)

![](https://liuxianyu.cn/image-hosting/posts/vue-cli3-analyzer/1.png)
![](https://liuxianyu.cn/image-hosting/posts/vue-cli3-analyzer/2.png)
