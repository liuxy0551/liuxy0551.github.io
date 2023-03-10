---
title: WebStorm 行注释的位置问题
urlname: webstorm-html-line
tags:
  - WebStorm
categories:
  - 开发工具
  - WebStorm
author: liuxy0551
copyright: true
date: 2019-11-28 11:40:21
updated: 2019-11-28 11:40:21
---

&emsp;&emsp;WebStorm 中快捷键`cmd + /`行注释，`//`会跑到该行的顶格处，记录一下如何设置可以恢复正常。

<!--more-->

&emsp;&emsp;进入 WebStorm -> Preferences -> Editor -> Code Style -> HTML -> Code Generation，将 Line comment at first column 和 Block comment at first column 前的勾选全部取消，解决问题。
![](https://liuxianyu.cn/image-hosting/posts/webstorm-html-line/1.png)

&emsp;&emsp;修改前：
![](https://liuxianyu.cn/image-hosting/posts/webstorm-html-line/2.png)

&emsp;&emsp;期望、修改后：
![](https://liuxianyu.cn/image-hosting/posts/webstorm-html-line/3.png)
