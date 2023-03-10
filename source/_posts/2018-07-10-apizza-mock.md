---
title: 在 apizza 中使用 Mock 来模拟接口数据
urlname: apizza-mock
tags:
  - Mock
categories:
  - 前端
  - Mock
author: liuxy0551
copyright: true
date: 2018-07-10 21:39:30
updated: 2018-07-10 21:39:30
---


　　作为一个前端开发人员，经常需要和接口文档打交道，公司使用的是 apizza，在 Chrome 中安装插件后功能提升明显。
<!--more-->


### apizza

　　[apizza](https://apizza.net/) 简单来说就是一个 API 管理工具，也可以称之为多人在线协作的接口调试工具。在 Chrome 中安装 apizza 的插件后可以使用免费版的全部功能。可以通过
 [apizza官网](https://apizza.net/) 右上角的 [插件安装](https://apizza.net/page/downloadext) 获取 Chrome 插件。也可以点击链接获取压缩包再安装：[https://pan.baidu.com/s/1LkXXNtxKj2oF1_g8MmScCg](https://pan.baidu.com/s/1LkXXNtxKj2oF1_g8MmScCg) 提取码：ayau。

　　使用方法可以参考一下这篇来自 [ouxiaoxian](https://me.csdn.net/ouxiaoxian) 的博客 [apizza的使用方法](https://blog.csdn.net/ouxiaoxian/article/details/80526979)。


### Mock.js

　　[Mock.js](http://mockjs.com/) 简而言之就是一个生成随机数据的工具。单纯使用的话可以直接进入 [Mock.js 官网](http://mockjs.com/) 顶部的 [示例](http://mockjs.com/examples.html) 标签查看使用方法，页面支持试验方法。

如果又兴趣查看源码的话可以从 [Mock.js 官网](http://mockjs.com/) 进入查看。


### 如何使用 apizza mock

　　apizza mock 是基于 Mock.js 开发的。具体文档可以 参见 Mock.js [详细文档](https://github.com/nuysoft/Mock/wiki) 或者查看 Mock.js 的 [示例](http://mockjs.com/examples.html)。

>**apizza 上如何使用 mock**
>* 1、新建接口
>* 2、填写 mock 在线地址
>* 3、编写 mock 数据模板
>* 4、点击预览按钮查看 mock 响应
>* 5、保存后，即可去代码中使用 mock 在线地址了

![](https://liuxianyu.cn/image-hosting/posts/apizza-mock/1.png)

还可以去 apizza 的 [使用帮助页](https://apizza.net/wiki/datamodel) 查看更多使用方法。
