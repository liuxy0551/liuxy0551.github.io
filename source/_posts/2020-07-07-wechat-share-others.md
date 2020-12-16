---
title: 微信分享第三方页面时设置标题和缩略图（非微信开发）
urlname: wechat-share-others
tags:
  - 微信
categories:
  - 前端
  - 微信
author: liuxy0551
copyright: true
date: 2020-07-07 16:51:17
updated: 2020-07-07 16:51:17
---

&emsp;&emsp;之前做过微信的自定义分享，是基于微信开发，这次是钉钉内开发，分享页面时标题和缩略图有点问题，记录一下。

<!--more-->



### 一、非 vue 项目

#### 1、标题

- 自动生成：获取当前页的 title
- 自定义：设置页面标题，也可以使用`document.title = '微信分享第三方页面时设置标题和缩略图（非微信开发）'`动态设置标题


#### 2、缩略图

- 自动生成：默认取当前页面，从顶部开始，`高度为屏幕宽度 80%`的图片作为缩略图，若页面中没有符合该规则的图片，则显示灰色的链接 icon
- 自定义：在 body 标签的最前面放入一张`高度为屏幕宽度 80%`的正方形图片，放在 body 标签的最前面。

```html
<body>
  <img style="position:fixed;width:80%;opacity:0;z-index:-1"
       src="http://zju123.oss-cn-hangzhou.aliyuncs.com/zju_graduate/images/zju-logo.jpg">
</body>
```


### 二、vue 项目

&emsp;&emsp;基于`vue-cli 3.x +`，在`public/index.html`中的 head 中设置：

```html
  <head>
    <meta name="description" content="庆祝中国科学院海洋研究所建所70周年">
    <meta property="og:title" content="庆祝中国科学院海洋研究所建所70周年">
    <meta property="og:image" content="http://159.226.158.199/media/logo.png">
    <meta property="og:description" content="庆祝中国科学院海洋研究所建所70周年">

    <title>庆祝中国科学院海洋研究所建所70周年</title>
  </head>
```



>**注意**
> 1、标题长度尽量不要超过15个字
> 2、内容简介尽量不要超过30个字，不能含敏感词违规字眼
