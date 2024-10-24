---
title: Git 常用命令（九）—— git revert 反做 commit
urlname: git-order-i
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-19 11:10:31
updated: 2020-05-06 21:10:31
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`git revert 反做某个版本`：

<!--more-->

### 一、适用场景：

&emsp;&emsp;如果我们想改动之前某个 commit 的提交内容，但是又想保留此 commit 之后的 commit。

### 二、具体操作：

&emsp;&emsp;1、反做
``` shell
git revert -n 版本号(..版本号)
```

&emsp;&emsp;2、提交
``` shell
git add .
git commit -m 'commit message'
git push origin develop
```
