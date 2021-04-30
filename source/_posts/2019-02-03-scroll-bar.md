---
title: 自定义滚动条样式
urlname: scroll-bar
tags:
  - HTML
categories:
  - 前端
  - HTML
author: liuxy0551
copyright: true
date: 2019-02-03 13:57:46
updated: 2019-02-03 13:57:46
---


&emsp;&emsp;记录一下自定义滚动条样式的代码。

<!--more-->

``` css
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: #d0d0d0;
    height: 50px;
    outline-offset: -2px;
    outline: 0 solid #fff;
    -webkit-border-radius: 4px;
    border: 0 solid #fff;
}
::-webkit-scrollbar-track-piece {
    background-color: #f1f1f1;
}
```
