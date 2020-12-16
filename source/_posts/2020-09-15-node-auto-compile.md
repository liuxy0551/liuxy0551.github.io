---
title: node 自动编译
urlname: node-auto-compile
tags:
  - node
categories:
  - node
author: liuxy0551
copyright: true
date: 2020-09-15 14:38:03
updated: 2020-09-15 14:38:03
---



&emsp;&emsp;node 开发中自动编译无需重启是件很重要的事，记录一下几个工具。

<!--more-->


- <a href="https://www.npmjs.com/package/nodemon" target="_black">nodemon</a>`推荐`
- <a href="https://www.npmjs.com/package/supervisor" target="_black">supervisor</a>


&emsp;&emsp;全局安装：

```
npm i nodemon -g
```

&emsp;&emsp;项目根目录运行：

```
nodemon app.js
```
