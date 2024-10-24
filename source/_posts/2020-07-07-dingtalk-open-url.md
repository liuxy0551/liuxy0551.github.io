---
title: 跳到钉钉并打开指定 URL
urlname: dingtalk-open-url
tags:
  - 钉钉开发
categories:
  - 前端
  - 钉钉开发
author: liuxy0551
copyright: true
date: 2020-07-07 16:40:23
updated: 2020-07-07 16:40:23
---

&emsp;&emsp;平常公司开发中一直围绕钉钉，这里记录一下如何在浏览器访问特定地址可以跳到钉钉并打开指定 URL，适用部分业务场景。

<!--more-->


#### 1、移动端

```javascript
const url = 'https://www.baidu.com/'
location.href = `http://qr.dingtalk.com/page/link?url=${ encodeURIComponent(url) }`
```


#### 2、PC 端

```javascript
const url = 'https://www.baidu.com/'
location.href = `dingtalk://dingtalkclient/page/link?url=${ encodeURIComponent(url) }`
```


#### 3、<a href="https://developers.dingtalk.com/document/app/message-link-description-1/title-6ld-qfs-yi0" target="_black">消息链接在`PC 客户端`侧边栏打开</a>

&emsp;&emsp;在`PC 客户端`点击消息中的 URL 链接时，希望控制链接的打开方式，可以使用以下方式：

```javascript
const url = 'https://www.baidu.com/'
`dingtalk://dingtalkclient/page/link?url=${ encodeURIComponent(url) }&pc_slide=true`
```

| 参数 | 说明 |
| :----: | :----: |
| url | 表示要打开的链接，必须urlEncode |
| pc_slide | true 表示在`PC 客户端`侧边栏打开，false 表示在浏览器打开 |


#### 4、<a href="https://developers.dingtalk.com/document/app/message-link-description-1/title-ffd-028-66i" target="_black">消息链接在`PC 客户端`工作台打开</a>

&emsp;&emsp;当消息中的 URL 链接是某个微应用链接时，希望在`PC 客户端`工作台打开，可以使用以下方式:

```
const url = 'https://www.baidu.com/'
`dingtalk://dingtalkclient/action/openapp?corpid=${ 免登企业 corpId }&container_type=work_platform&app_id=0_${ 应用 agentid }&redirect_type=jump&redirect_url=${ encodeURIComponent(url) }`
```

| 参数 | 说明 |
| :----: | :----: |
| corpid | 表示免登微应用用户的所属企业 |
| container_type | 表示使用哪种方式打开链接  work_platform 表示用工作台打开 |
| app_id | 由数字 0、下划线、agentid 拼接组成；agentid 是企业内部应用 id，<a href="https://ding-doc.dingtalk.com/doc#/bgb96b/mzd9qg/M753O" target="_black">获取 agentid 查看文档</a> |
| redirect_type | 只能填写 jump |
| redirect_url | 表示要跳转的地址，必须 urlEncode |


<a href="https://developers.dingtalk.com/document/app/message-link-description" target="_black">消息链接说明</a>
