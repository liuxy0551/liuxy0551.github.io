---
title: JS 实现数组元素交换
urlname: array-swap
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2020-03-04 14:03:00
updated: 2020-03-04 14:03:00
---


　　最近涉及到试卷出题的业务需求，其实去年3月份也做过类似的需求。在一套试卷中，题目需要可以上下移动位置，记录一下实现的原理。
<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/array-swap/1.png)

### 二、实现原理

``` javascript
swapArray (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
},
// 下移
indexUp () {
  this.swapArray(arr, index, index + 1)
},
// 上移
indexDown () {
  this.swapArray(arr, index, index - 1)
}
```

[在线 Demo](https://my-vue.liuxianyu.cn/array)

实现效果中的代码 [Github](https://github.com/liuxy0551/my-vue/blob/master/src/pages/array.vue#L34)

### 参考资料

&emsp;&emsp;1、[js 实现数组元素交换位置](https://www.cnblogs.com/dearxinli/p/6802151.html)
