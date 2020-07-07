---
title: 跳到钉钉并打开指定 URL
urlname: dingtalk-open-url
tags:
  - 钉钉
categories:
  - 前端
  - 钉钉
author: liuxy0551
copyright: true
date: 2020-07-07 16:40:23
updated: 2020-07-07 16:40:23
---

&ensp;&ensp;&ensp;&ensp;平常公司开发中一直围绕钉钉，这里记录一下如何在浏览器访问特定地址可以跳到钉钉并打开指定 URL，适用部分业务场景。

<!--more-->


#### 1、移动端

```javascript
let url = 'https://www.baidu.com/'
location.href = `http://qr.dingtalk.com/page/link?url=${encodeURIComponent(url)}`
```


#### 2、PC 端

```javascript
let url = 'https://www.baidu.com/'
location.href = `dingtalk://dingtalkclient/page/link?url=${encodeURIComponent(url)}`
```
