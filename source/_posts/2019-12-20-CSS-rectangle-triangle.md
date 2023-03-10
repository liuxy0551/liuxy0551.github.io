---
title: 使用 CSS 绘制内外不同圆角的矩形、钝角三角形
urlname: css-rectangle-triangle
tags:
  - CSS
categories:
  - 前端
  - CSS
author: liuxy0551
copyright: true
date: 2019-12-20 14:59:49
updated: 2019-12-20 14:59:49
---


　　最近做的项目中 UI 同学给了个内外不同圆角的矩形和钝角三角形的设计，这里记录一下完成过程。
<!--more-->


### 一、实现效果

矩形内部圆角和外部圆角不一致，钝角三角形上不完全覆盖另一个钝角三角形的图案，且两个钝角处圆润程度不一致。
前期项目赶时间的时候用直角三角形实现了，本着不偷工减料及钻研的态度，利用`伪类`按照设计图实现了一下。蓝色为设计图部分，绿色为实现部分。


![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/7.png)
{% gp 6-6 %}
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/1.png)
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/2.png)
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/3.png)
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/4.png)
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/5.png)
![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/6.png)
{% endgp %}


### 二、矩形代码

具体实现代码可参考：[rectangle.vue](https://github.com/liuxy0551/vue-cli3-build-optimization/blob/master/src/pages/css/rectangle.vue)

1、HTML
``` html
<div class="rectangle"></div>
```

2、CSS
``` css
  .rectangle {
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
    }
    &:before {
      width: 325px;
      height: 180px;
      border-radius: 15px;
      background-color: #41b883;
    }
    &:after {
      width: 305px;
      height: 160px;
      top: 10px;
      left: 10px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
```


### 三、钝角三角形代码

具体实现代码可参考：[triangle.vue](https://github.com/liuxy0551/vue-cli3-build-optimization/blob/master/src/pages/css/triangle.vue)

1、HTML
``` html
<div class="triangle"></div>
```

2、CSS
``` css
  .triangle {
    width: 30px;
    height: 90px;
    overflow: hidden;
    position: relative;
    &:before, &:after {
      content: '';
      width: 50px;
      height: 50px;
      position: absolute;
      transform: scaleY(1.3) translate(30%, -30px) rotate(45deg);
    }
    &:before {
      left: -7px;
      top: 59px;
      border-radius: 10px;
      background-color: #41b883;
    }
    &:after {
      left: 7px;
      top: 59px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
```


### 四、气泡对话框

具体实现代码可参考：[bubble.vue](https://github.com/liuxy0551/vue-cli3-build-optimization/blob/master/src/pages/css/bubble.vue)

![](https://liuxianyu.cn/image-hosting/posts/css-rectangle-triangle/7.png)
