---
title: Vue 项目中借助 crypto-js 实现 AES 加密
urlname: vue-crypto-js-aes
tags:
  - 加密解密
categories:
  - 前端
  - 加密解密
author: liuxy0551
copyright: true
date: 2019-11-11 22:23:08
updated: 2019-11-11 22:23:08
---


&emsp;&emsp;公司项目需要上架钉钉应用市场，上架要求中包含了接口请求进行加密，这里记录一下最终采用的方案 —— `AES`
<!--more-->


### 一、crypto-js

&emsp;&emsp;参考：[https://www.npmjs.com/package/crypto-js](https://www.npmjs.com/package/crypto-js)


### 二、自行封装

```javascript
import CryptoJS from 'crypto-js'

// 秘钥
const keyStr = 'wise_job'

export default {
  // 加密
  encrypt (word) {
    let encryptedAES = CryptoJS.AES.encrypt(word, keyStr).toString()  // base64 字符串
    // this.decrypt(encryptedAES)

    return encodeURIComponent(encryptedAES)
  },

  // 解密
  decrypt (encryptedAES) {
    let bytes = CryptoJS.AES.decrypt(encryptedAES, keyStr)
    let str = bytes.toString(CryptoJS.enc.Utf8)

    str && console.log(JSON.parse(str))
    return str ? JSON.parse(str) : {}
  }
}
```
