---
title: node 微信公众号开发（四）—— 获取并缓存 jsapi_ticket 并生成 JS-SDK 权限验证的签名
urlname: node-wechat-jsapi_ticket
tags:
  - node
categories:
  - 前端
  - 微信开发
author: liuxy0551
copyright: true
date: 2020-12-11 11:43:35
updated: 2020-12-11 11:43:35
---

&emsp;&emsp;最近想用 node 写一个微信公众号的项目，建议全程 https，这里记录一下如何获取并缓存 jsapi_ticket 并生成 JS-SDK 权限验证的签名。

<!--more-->


### 一、jsapi_ticket

&emsp;&emsp;这一部分可参考 <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62" target="_black">官方文档 - JS-SDK 使用权限签名算法</a>，<a href="https://liuxianyu.cn/article/node-wechat-base-koa.html#2-app-config-js" target="_black">app.config.js</a>。

#### 1、getJsapiTicket.js

``` javascript
/**
 * jsapiTicket 的缓存和更新
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const appConfig = require('../../app.config')

const fileName = path.resolve(__dirname, './jsapiTicket.json')
let accessTokenTemp, validTime = 7200 // jsapiTicket 的默认有效时间

/**
 * 根据 access_token 获取 jsapiTicket
 * @param {string} accessToken
 */
const getJsapiTicket = async (accessToken) => {
  accessTokenTemp = accessToken
  try {
    let readRes = fs.readFileSync(fileName, 'utf8')
    readRes = JSON.parse(readRes)

    // 如果创建的时间超过现在时间默认 7200ms
    const createTime = new Date(readRes.createTime).getTime()
    const nowTime = new Date().getTime()
    if ((nowTime - createTime) / 1000 >= validTime) {
      await updateJsapiTicket()
      return await getJsapiTicket()
    }

    return readRes.jsapiTicket
  } catch (error) {
    // 未读取到文件中的正确内容则更新接口
    await updateJsapiTicket()
    return await getJsapiTicket()
  }
}

// 更新本地缓存的 jsapiTicket
const updateJsapiTicket = async () => {
  const res = JSON.parse(await getNewJsapiTicket())
  if (res.ticket) {
    validTime = res.expires_in
    fs.writeFileSync(fileName, JSON.stringify({ createTime: new Date(), ...res }))
  } else {
    await updateJsapiTicket()
  }
}


/**
 * 根据 access_token 获取 jsapiTicket
 * @return {Promise}
 */
// 从微信获取新的 jsapiTicket，有效时间默认是 7200ms
const getNewJsapiTicket = async () => {
  console.log('从微信服务器获取 jsapiTicket 啦')
  return new Promise((resolve, reject) => {
    request.get(`${ appConfig.wxapiBaseUrl }/ticket/getticket?access_token=${ accessTokenTemp }&type=jsapi`, (err, res, body) => {
      if (err) {
        reject('获取 jsapiTicket 失败 检查 getJsapiTicket 函数')
      }
      resolve(body)
    })
  })
}

// jsapiTicket 默认有效时间 7200ms，五分钟交替时间
setInterval(async () => {
  await updateJsapiTicket()
}, (validTime - 300) * 1000)

module.exports = getJsapiTicket
```

#### 2、外部获取 jsapi_ticket

``` javascript
const getAccessToken = require('../utils/wechat/getAccessToken')
const getJsapiTicket = require('../utils/wechat/getJsapiTicket')

const jsapiTicket = await getJsapiTicket(await getAccessToken())
console.log(jsapiTicket)
```


### 二、签名算法

&emsp;&emsp;这一部分可参考 <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62" target="_black">官方文档 - JS-SDK 使用权限签名算法</a>

#### 1、sign.js

``` javascript
/**
 * 从这里下载官方示例
 * http://demo.open.weixin.qq.com/jssdk/sample.zip
 * jssha 请用官方示例中的文件
 */

var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15)
}

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + ''
}

var raw = function (args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]
  })

  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}

/**
* @synopsis 签名算法 
*
* @param appId 应用appId
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (appId, jsapi_ticket, url) {
  let timestamp = createTimestamp()
  let nonceStr = createNonceStr()
  var ret = { appId, jsapi_ticket, nonceStr, timestamp, url }
  var string = raw(ret)
  var jsSHA = require('jssha')
  var shaObj = new jsSHA(string, 'TEXT')
  var signature = shaObj.getHash('SHA-1', 'HEX')

  const config = { appId, timestamp, nonceStr, signature }
  return config
}

module.exports = sign
```

>**注意**
>  jssha 建议与官方 demo 使用的版本一致，即1.5.0版本，可输入如下命令安装：

```
npm i jssha@1.5.0 -S
```

#### 2、签名结果

```
const appConfig = require('../app.config')
const sign = require('../utils/wechat/sign')
const getAccessToken = require('../utils/wechat/getAccessToken')
const getJsapiTicket = require('../utils/wechat/getJsapiTicket')

// 获取微信鉴权信息
async getConfig () {
  let config
  try {
    const jsapiTicket = await getJsapiTicket(await getAccessToken())
    config = sign(appConfig.appId, jsapiTicket, ctx.query.url)
  } catch (error) {
    console.log('error', error)
    config = {}
  }
  console.log(config)
}
```
