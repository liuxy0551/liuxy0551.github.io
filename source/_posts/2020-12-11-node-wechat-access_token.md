---
title: node 微信公众号开发（三）—— 获取并缓存 access_token
urlname: node-wechat-access_token
tags:
  - node
  - 微信公众号
categories:
  - 前端
  - 微信公众号
author: liuxy0551
copyright: true
date: 2020-12-11 11:05:48
updated: 2020-12-11 11:05:48
---

&emsp;&emsp;最近想用 node 写一个微信公众号的项目，建议全程 https，这里记录一下如何获取并缓存 access_token。

<!--more-->


### 一、开发信息

&emsp;&emsp;在`微信公众号管理平台 -> 开发 -> 基本设置 -> 公众号开发信息`中获取 appId、appSecret，并将服务器和本地的 ip 配置到`IP白名单`中，<a href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1495617578&version=1&lang=zh_CN&platform=2" target="_black">“获取access_token”接口新增IP白名单保护</a>。


### 二、access_token

&emsp;&emsp;这一部分可参考 <a href="https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html" target="_black">官方文档 - 获取Access token</a>，<a href="https://liuxianyu.cn/article/node-wechat-base-koa.html#2-app-config-js" target="_black">app.config.js</a>。

#### 1、getAccessToken.js

``` javascript
/**
 * access_token 的缓存和更新
 */
const fs = require('fs')
const path = require('path')
const request = require('request')
const appConfig = require('../../app.config')

const fileName = path.resolve(__dirname, './access_token.json')
let validTime = 7200 // access_token 的默认有效时间，单位秒

/**
 * 通过 appId 和 appSecret 获取 access_token
 * @return {Promise}
 */
const getAccessToken = async () => {
  try {
    let readRes = fs.readFileSync(fileName, 'utf8')
    readRes = JSON.parse(readRes)

    // 如果创建的时间超过现在时间默认 7200 秒
    const createTime = new Date(readRes.createTime).getTime()
    const nowTime = new Date().getTime()
    if ((nowTime - createTime) / 1000 >= validTime) {
      await updateAccessToken()
      return await getAccessToken()
    }

    return readRes.access_token
  } catch (error) {
    // 未读取到文件中的正确内容则更新接口
    await updateAccessToken()
    return await getAccessToken()
  }
}

// 更新本地缓存的 access_token
const updateAccessToken = async () => {
  const res = JSON.parse(await getNewAccessToken())
  if (res.access_token) {
    validTime = res.expires_in
    fs.writeFileSync(fileName, JSON.stringify({ createTime: new Date(), ...res }))
  } else {
    await updateAccessToken()
  }
}

// 从微信获取新的 access_token，有效时间默认是 7200 秒
const getNewAccessToken = async () => {
  console.log('从微信服务器获取 access_token 啦')
  return new Promise((resolve, reject) => {
    request.get(`${ appConfig.wxapiBaseUrl }/token?grant_type=client_credential&appId=${ appConfig.appId }&secret=${ appConfig.appSecret }`, (err, res, body) => {
      if (err) {
        reject('获取 access_token 失败 检查 getAccessToken 函数')
      }
      resolve(body)
    })
  })
}

// access_token 默认有效时间 7200 秒，五分钟交替时间
setInterval(async () => {
  await updateAccessToken()
}, (validTime - 300) * 1000)

module.exports = getAccessToken
```

#### 2、外部获取 access_token

``` javascript
const getAccessToken = require('../utils/wechat/getAccessToken')

const accessToken = await getAccessToken()
console.log(accessToken)
```

>**注意**
>  在 getAccessToken() 中调用本身的地方需要注意，两处 await getAccessToken() 前都要加上 return，否则执行到这里时，外部调用 await getAccessToken() 拿到的会是 undefined，因为不加 return 意味着没有将此处拿到的返回值重新返回给外部。
