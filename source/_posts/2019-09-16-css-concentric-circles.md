---
title: HTML + CSS 伪元素实现同心圆
urlname: css-concentric-circles
tags:
  - CSS
categories:
  - 前端
  - CSS
author: liuxy0551
copyright: true
date: 2019-09-16 13:36:30
updated: 2019-09-16 13:36:30
---


　　最近工作中涉及到一个同心圆样式的绘制，记录一下通过一个 `div` 实现的方法。
<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/css-concentric-circles/1.png)


### 二、HTML

``` html
<div class="radio active"></div>
```

### 三、CSS

``` scss
.radio {
  width: 16px;
  height: 16px;
  border: 2px #DBE0E6 solid;
  border-radius: 50%;
  &.active {
    border: 2px #53A2F7 solid;
    position: relative;
    &:before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #53A2F7;
      position: absolute;
      top: 3px;
      left: 3px;
    }
  }
}
```

>**注意**
>* **`content` 属性与 :before 及 :after 伪元素配合使用，插入生成的内容，必须有 `content` 属性，否则中间的圆不显示**
