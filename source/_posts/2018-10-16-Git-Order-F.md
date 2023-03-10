---
title: Git 常用命令（六）—— 从远程仓库中删除文件夹或文件
urlname: git-order-f
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-16 18:12:22
updated: 2019-12-13 12:26:56
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`从远程仓库中删除文件夹或文件`：

<!--more-->


&emsp;&emsp;项目上传到远程仓库时，忘记忽略某个文件夹就 push 了，如：`.idea`，记录一下删除掉`.idea`的操作。

&emsp;&emsp;1、git 记录中删除`.idea`文件夹：

``` shell
git rm -r --cached .idea
```
    
&emsp;&emsp;2、将更改记录提交到本地仓库：

``` shell
git commit -m 'delete: git .idea'
```

&emsp;&emsp;3、提交到远程仓库：

``` shell
git push origin master
```
    
&emsp;&emsp;或者覆盖：

``` shell
git push -u origin master
```

&emsp;&emsp;本地项目中的`.idea`文件夹不收操作影响，删除的只是远程仓库中的`.idea`文件夹，可放心删除，其他文件或文件夹同理。
