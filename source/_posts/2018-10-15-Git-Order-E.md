---
title: Git 常用命令（五）—— 删除本地、远程分支
urlname: git-order-e
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-15 18:12:22
updated: 2019-12-13 12:23:28
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`删除本地、远程分支`：
<!--more-->


&emsp;&emsp;每次操作后可执行`git branch -a`查看分支情况：

### 一、删除本地分支 dev：
``` shell
git branch -d dev
```
&emsp;&emsp;如果报错：error: The branch 'dev01' is not fully merged，可使用`git branch -D dev`


### 二、删除远程分支 dev

``` shell
git push origin --delete dev
```
