---
title: vue 项目在 360 浏览器中设置默认内核
urlname: 360-browser-default-kernel
tags:
  - Vue
categories:
  - 前端
  - Vue
author: liuxy0551
copyright: true
date: 2020-04-18 13:13:11
updated: 2020-04-18 13:13:11
---

&emsp;&emsp;测试同学说项目在 360 浏览器中白屏，了解了下是 360 浏览器内核设置的原因，记录下解决方法。

<!--more-->




#### 1、解决办法

&emsp;&emsp;**请用域名测试为准，不要用IP地址测试**。在`<head></head>`标签中增加`meta`标签：

```
<meta name="renderer" content="webkit">
```


#### 2、官方文档

&emsp;&emsp;<a href="https://bbs.360.cn/thread-14958904-1-1.html" target="_black">360 浏览器自定义设置内核模式说明</a>
