---
title: JavaScript 中的异步编程
urlname: js-cb-promise-async-await
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-10-19 20:30:28
updated: 2020-10-21 14:21:54
---


&emsp;&emsp;烂笔头记录一下 JavaScript 中的异步编程。

<!--more-->


&emsp;&emsp;异步编程的方法有：

- 回调函数
- Promise
- async/await


#### 1、回调函数

&emsp;&emsp;回调函数在复杂场景下会影响代码的可读性和执行效率。


#### 2、Promise

&emsp;&emsp;Promise 是 es6 异步编程的一种方案，有三种状态：pending(挂起)、fullfilled(成功)、rejected(拒绝)，状态改变后不可逆，通过 then 方法来实现异步调用后的逻辑，支持链式调用。对应的状态变化有两种情况：

- pending -> fullfilled (resolved 解决)
- pending -> rejected (rejected 拒绝)


#### 3、async、await

&emsp;&emsp;async、await 是 es7 用来实现异步编程的，语法是在 function 关键词前加上`async`，代表是异步函数，`await`只能在`async`函数(异步方法)里使用，因为`await`访问本身就会造成程序停止阻塞，`await`的阻塞功能，可以把异步方法改成同步。`async`可以将任何函数转换为 Promise，`await`可以用在任何返回 Promise 的函数之前，并且会暂停在这里，直到 Promise 返回结果才往下进行。

``` javascript
async function getData () {
  return '这是一个数据'
}

!async function () {
  let p = await getData()
  console.log(p)
}()
```

&emsp;&emsp;async、await 基本做到了用同步代码的风格实现异步逻辑，让代码更简洁。
