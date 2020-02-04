---
title: async、await
urlname: async-await
tags:
  - JavaScript
  - es6
categories:
  - JavaScript
  - es6
author: liuxy0551
copyright: true
date: 2019-10-19 20:30:28
updated: 2019-10-19 20:30:28
---

## 介绍

　　烂笔头记录一下 async 和 await 的用法。
<!--more-->


　　async 是异步的简写，而 await 可以认为是 async await 的简写。
　　简单理解：
　　`async`申明方法是异步的，
　　`await`等待异步方法执行完成，但是必须得用异步方法里面，因为 await 访问本身就会造成程序停止阻塞。

``` javascript
async function getData () {
  return '这是一个数据'
}

async function test () {
  let p = await getData()
  console.log(p)
}

test()
```

　　`await`的阻塞功能，可以把异步方法改成同步
