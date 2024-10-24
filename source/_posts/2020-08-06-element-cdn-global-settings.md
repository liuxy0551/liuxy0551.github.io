---
title: 通过 CDN 引入 element-ui 时，如何改变其全局配置 (size, z-index)
urlname: element-cdn-global-settings
tags:
  - Element UI
  - CDN
categories:
  - 前端
  - vue
author: liuxy0551
copyright: true
date: 2020-08-06 13:17:54
updated: 2020-08-06 13:17:54
---

&emsp;&emsp;最近在写一个后台管理的项目，自己觉得按钮默认的尺寸比较大，遂加上了`size="small"`，但是发现每个页面的按钮都需要加上才够统一、协调，想起了 Element 官方有推荐全局配置，改之。

<!--more-->

&emsp;&emsp;以上是通过 npm 引入 Element 的写法，为提升加载速度，项目中大部分基本库都是通过 CDN 引入的，Element 亦然。那么`通过 CDN 引入 element-ui 时，如何改变其全局配置 (size, z-index)`呢，记录如下：



### 一、官方推荐（npm 安装法）

&emsp;&emsp;size 的值有：medium、small、mini，默认值为空字符串，比 medium 大。

![](https://images-hosting.liuxianyu.cn/posts/element-cdn-global-settings/1.png)



### 二、编译源码，CDN 引入

&emsp;&emsp;拉取 <a href="https://github.com/ElemeFE/element" target="_black">element-ui</a> 源码(master 分支)，在`package.json`中查找如何编译出 js，注意`dist`命令。

![](https://images-hosting.liuxianyu.cn/posts/element-cdn-global-settings/2.png)

&emsp;&emsp;在`/build/bin/build-entry.js`中将：
```
Vue.prototype.$ELEMENT = {
  size: opts.size || '',
  zIndex: opts.zIndex || 2000
};
```
改为
```
Vue.prototype.$ELEMENT = {
  size: opts.size || 'small',
  zIndex: opts.zIndex || 3000
};
```

&emsp;&emsp;接着执行`npm run dist`，上传`/lib/index.js`到 OSS 并引用，再次刷新，页面上的按钮就变小啦！


>**注意**
>* `npm run dist`也会打包样式文件
>* 至于如何在众多命令中使用正确合适的命令，可以通过全局搜索`Vue.prototype.$ELEMENT`，一层一层地去发现查找到的各个文件之间的关联，不难发现`/src/index.js`中的代码是依据`build-entry.js`来生成的。



### 三、类似随笔

<a href="https://liuxianyu.cn/article/build-element-ui.html" target="_black">通过 CDN 引入 element-ui 时，如何改变其主题色</a>
