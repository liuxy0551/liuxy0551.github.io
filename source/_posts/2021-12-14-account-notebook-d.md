---
title: 账号簿开发（四）—— 写一个随机密码生成器
urlname: account-notebook-d
tags:
  - 微信小程序
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2021-12-14 21:39:53
updated: 2021-12-14 21:39:53
---


&emsp;&emsp;用户在第一次注册网站时，可以使用`随机密码生成器`生成一个密码，可以控制密码长度和密码包含的内容项（大小写字母、数字、字符），不满意可以重新生成。

<!--more-->


&emsp;&emsp;这是一个系列随笔，主要记录『账号簿』微信小程序的开发过程：
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook.html" target="_black">账号簿（微信小程序）的开发过程</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-a.html" target="_black">账号簿开发（一）—— 微信小程序 AES 加密解密</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-b.html" target="_black">账号簿开发（二）—— 微信小程序检查更新及调试</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-c.html" target="_black">账号簿开发（三）—— 微信小程序的云开发</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-d.html" target="_black">账号簿开发（四）—— 写一个随机密码生成器</a>  


### 一、实现效果

{% gp 4-4 %}
  ![](https://images-hosting.liuxianyu.cn/posts/account-notebook/6.png)
  ![](https://images-hosting.liuxianyu.cn/posts/account-notebook/7.gif)
{% endgp %}

### 二、需求分解

- 写一个方法，接收密码包含的内容项（大小写字母、数字、字符）和需要的长度
- 根据密码长度确定每个内容项出现几次，取余后的从所有内容项中随机取
- 将上述得到的密码字符串使用乱序算法打乱


### 三、代码实现

#### 3.1、基础单元

- 大写字母: `ABCDEFGHIJKLMNPQRSTUVWXYZ`
- 小写字母: `abcdefghijklmnopqrstuvwxyz`
- 数字: `1234567890`
- 符号: `~!@#$%^&*()[]{}:,./?-_+=<>`

#### 3.2、生成分段式密码

&emsp;&emsp;完整代码：<a href="https://github.com/liuxy0551/account-notebook/blob/master/src/utils/password.js" target="_black">/src/utils/password.js</a>  

``` javascript
/**
 * 生成随机密码
 * 1、先确定 average，平均每类选多少个字符
 * 2、remainder 剩余的从累加字符串中随机取
 * 3、使用乱序算法，打乱字符串 https://blog.csdn.net/yunlliang/article/details/41084785
 * @param {Array} 包含的项，upper 大写字母，lower 小写字母，number 数字，symbol 特殊符号  
 * @param {number} 密码长度 
 * @returns string
 */
const getRandomPassword = (arr = [], length) => {
    const average = Math.floor(length / arr.length)
    const remainder = length % arr.length

    let str = '', allStr = ''
    for (let i of arr) {
        str += getRandomStr(i, average)
    }

    arr.forEach(item => allStr += strObj[item])
    for (let i = 0; i < remainder; i++) {
        str += allStr[random(allStr.length)]
    }

    return shuffle(str.split('')).join('')
}

// 获取固定个数的字符串
const getRandomStr = (key, average) => {
    let str = strObj[key], result = ''
    for (let i = 0; i < average; i++) {
        result += str[random(str.length)]
    }
    return result
}

/**
 * 生成范围内的随机整数
 * @param {number} max 
 * @param {number} min 
 * @returns number
 */
const random = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min)) + min
}
```

#### 3.3、乱序算法

&emsp;&emsp;上述拿到的密码是一个分段式的密码，举个例子，我需要长度为 8 且包含大小写字母、数字的密码，那么经常上述方法，得到的会是这样一个密码：`Aa1Aa1Aa`，即按包含的项依次拿出单个字符串的密码，最后拼接在一起。
&emsp;&emsp;显然上述得到的密码不太实用，而且不够安全，这时候可以将上述密码打乱一下顺序，即可得到最终的密码。

``` javascript
// 乱序算法
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}
```

#### 3.4、组件调用

&emsp;&emsp;完整代码：<a href="https://github.com/liuxy0551/account-notebook/blob/master/src/pages/account/components/NewPassword/index.jsx" target="_black">/src/pages/account/components/NewPassword/index.jsx</a>  

``` javascript
const checkboxList = [
    { value: 'upper', label: '包含大写字母', checked: true },
    { value: 'lower', label: '包含小写字母', checked: true },
    { value: 'number', label: '包含数字', checked: true },
    { value: 'symbol', label: '包含符号', checked: false }
]
const checkboxValue = checkboxList.filter(item => item.checked).map(item => item.value)

const lengthIdx = 2
const lengthList = []
for (let i = 6; i <= 30; i++) {
    lengthList.push(i)
}

const password = getRandomPassword(checkboxValue, lengthList[lengthIdx])
```

