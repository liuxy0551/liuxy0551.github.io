---
title: Git 常用命令（十一）—— 解决每次拉代码都需要输入用户名和密码
urlname: git-order-k
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2020-12-10 13:45:46
updated: 2020-12-10 13:45:46
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`解决每次拉代码都需要输入用户名和密码`：
<!--more-->

### 全局配置

```
git config credential.helper store
```
&emsp;&emsp;上述命令会在拉取时记录用户名和密码，下次再执行 git pull 时就不用再输入了。

&emsp;&emsp;**也可以使用 ssh 链接 clone 项目**
