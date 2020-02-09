---
title: 图片大小不固定时在 div 中居中显示
urlname: image-center-css
tags:
  - CSS
categories:
  - 前端
  - CSS
author: liuxy0551
copyright: true
date: 2018-10-30 20:29:30
updated: 2018-10-30 20:29:30
---


　　公司的一个商城项目中，需要实现商品详情页顶部图片非正方形时补白且居中，尝试了很多方法，实现后发现其实很简单，记录一下。
<!--more-->


### 一、实现效果

<center>
    <iframe width="500" height="400" src="/images/posts/Img-Center-CSS/3.mp4" allowfullscreen></iframe>
</center>
<br>

　　项目是移动端的项目，基于 Vue + Mint UI 实现。效果区域使用的是 Mint UI 自带的 swipe 组件，取消了自动播放。

### 二、具体实现

#### 1、HTML 部分

　　![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Img_Center_CSS/1.png)
```
    <mt-swipe :auto="0">
      <mt-swipe-item class="product-swipe" v-for="item in product_info.images" :key="item.piid">
        <img :src="item.piurl" class="product-img">
      </mt-swipe-item>
    </mt-swipe>
```

#### 2、CSS 部分

　　![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Img_Center_CSS/2.png)
```
      .product-swipe {
        width: 750px;
        height: 750px;
        .product-img {
          max-width: 750px;
          max-height: 750px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      .mint-swipe {
        width: 750px;
        height: 750px;
      }
```
