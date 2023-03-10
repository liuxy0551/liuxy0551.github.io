---
title: 账号簿开发（一）—— 微信小程序 AES 加密解密
urlname: account-notebook-a
tags:
  - 微信小程序
  - 加密解密
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2021-08-08 16:42:00
updated: 2021-08-08 16:42:00
---


&emsp;&emsp;『账号簿』作为一款记录账号密码的微信小程序而言，安全自然是很重要的，基于此放弃了自行搭建数据库的打算，使用了腾讯云为微信小程序提供的云开发功能，同时也提供数据库的功能，是一个对象型的数据库，安全性比自己在 Docker 中搭建的数据库要高且有更多保障。但是即便如此，上传到数据库的账号密码也使用了业内普遍认可的 AES 对称加密算法进行加密再经 BASE64 编码。这里记录一下 AES 加密后再经 BASE64 编码的过程。

<!--more-->


&emsp;&emsp;这是一个系列随笔，主要记录『账号簿』微信小程序的开发过程：
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook.html" target="_black">账号簿（微信小程序）的开发过程</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-a.html" target="_black">账号簿开发（一）—— 微信小程序 AES 加密解密</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-b.html" target="_black">账号簿开发（二）—— 微信小程序检查更新及调试</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-c.html" target="_black">账号簿开发（三）—— 微信小程序的云开发</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-d.html" target="_black">账号簿开发（四）—— 写一个随机密码生成器</a>  


### 一、CryptoJS

&emsp;&emsp;依赖 CryptoJS 进行加密，可以新建目录 `/src/utils/lib`，在 lib 目录下新建文件 `CryptoJS.js`，具体代码见：<a href="https://github.com/liuxy0551/account-notebook/blob/master/src/utils/cloudSync/lib/CryptoJS.js#L1" target="_black">CryptoJS.js</a>，然后在 utils 目录下新建文件 `crypto.js`，代码如下：

``` javascript
/**
 * 加密过程：先对账号和密码进行 AES 加密，再进行 BASE64 编码
 * 解密过程：与加密过程相反
 */

import CryptoJS from './lib/CryptoJS'

const key = CryptoJS.enc.Utf8.parse('0102030405060807') // 十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('0102030405060807') // 十六位十六进制数作为秘钥偏移量

// aes 加密
const aesEncrypt = (word) => {
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return Base64Encode(encrypted.ciphertext.toString().toUpperCase())
}

// aes 解密
const aesDecrypt = (val) => {
    let word = Base64Decode(val)
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

// base64 加密
const Base64Encode = (val) => {
    let str = CryptoJS.enc.Utf8.parse(val)
    let base64 = CryptoJS.enc.Base64.stringify(str)
    return base64
}

// base64 解密
const Base64Decode = (val) => {
    let words = CryptoJS.enc.Base64.parse(val)
    return words.toString(CryptoJS.enc.Utf8)
}

export {
    aesEncrypt,
    aesDecrypt
}
```


### 二、使用

``` javascript
import { aesEncrypt, aesDecrypt } from '@/utils/crypto'

const password = 'Aa@.-123456'
console.log('原密码：', password) // Aa@.-123456
console.log('加密后：', aesEncrypt(password)) // MTgzRDhEQTA1ODUzQzMwMDU0NkQyQ0FGQTg4RDI3NjQ
console.log('解密后：', aesDecrypt(aesEncrypt(password))) // Aa@.-123456
```

![](https://liuxianyu.cn/image-hosting/posts/account-notebook/3.png)
