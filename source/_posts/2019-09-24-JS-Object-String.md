---
title: JS 中把对象转成 String
urlname: js-object-string
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-09-24 19:07:15
updated: 2019-11-07 10:53:08
---


　　最近公司项目在钉钉应用市场上线时，钉钉要求请求的数据需要加密（尤其是不允许暴露各类 id），保障数据安全。因为是上线周期内才提出的加密，所以由前端加密、后端解密来完成需求。后端希望 GET 请求`?`后的所有内容按正常请求时的格式进行加密，即加密`getResume?page=1&pageSize=10&jobId=2`，加密后的请求为`getResume?data=密文`。目前在做 GET 请求的参数加密，实现思路是 axios 请求拦截把 params 对象转成字符串，记录一下两种实现方式。
<!--more-->


### 一、URLSearchParams

[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 接口定义了一些实用的方法来处理 URL 的查询字符串。

``` javascript
  let params = { page: 1, pageSize: 10, jobId: 2 }
  let str = new URLSearchParams(params).toString()
  console.log(str)                         // page=1&pageSize=10&jobId=2
```

>**注意**
>* **1、当 params = null 时，输出 `null=`**
>* **2、当 params = undefined || {} 时，输出空字符串**


### 二、Object.keys 和 map

``` javascript
  let params = { page: 1, pageSize: 10, jobId: 2 }
  let keyList = Object.keys(params)        // ["page", "pageSize", "jobId"]
  let valueList = keyList.map((i) => { return i + '=' + params[i] })
  let valueList1 = keyList.map((i) => { return params[i] })                 // [1, 10, 2]
  console.log(valueList.join('&'))         // page=1&pageSize=10&jobId=2
```

>**注意**
>* **1、当 params = {} 时，keyList、valueList、valueList1 均输出`[]`**
>* **2、params 不允许为 null 或 undefined，否则 keyList 即会报错**
>* **3、以上代码可简写为：**

``` javascript
  let params = { page: 1, pageSize: 10, jobId: 2 }
  let valueList = Object.keys(params).map((i) => {
    return i + '=' + params[i]
  })
  console.log(valueList)                   // ["page=1", "pageSize=10", "jobId=2"]
  console.log(valueList.join('&'))         // page=1&pageSize=10&jobId=2
```


### 三、加密方法

　　参考另一篇随笔：[Vue 项目中实现 RSA 加密](https://liuxianyu.cn/article/vue-rsa.html)
