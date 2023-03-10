---
title: Git 常用命令（十）—— github Fork 的代码如何更新并新建 pull request
urlname: git-order-j
tags:
  - git
  - github
categories:
  - git
author: liuxy0551
copyright: true
date: 2020-06-07 15:09:16
updated: 2020-06-18 10:46:52
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`github Fork 的代码如何更新并新建 pull request`：
<!--more-->

### 1、拉取 Fork 后的代码
``` shell
git clone https://github.com/liuxy0551/vue-base-structrue.git
```


### 2、将原项目和本地项目关联
``` shell
git remote add author https://github.com/vue-quick-framework/vue-base-structrue.git
```
&emsp;&emsp;此时可以使用`git remote -v`查看远程仓库信息：
![](https://images-hosting.liuxianyu.cn/posts/git-order/2.png)


### 3、fetch 原项目的最新代码到本地
``` shell
git fetch author
```
&emsp;&emsp;从原项目 fetch 来的内容，会被存储在本地分支`author/master`


### 4、合并`author/master`和`master`
``` shell
git merge author/master
```


### 5、推送到 fork 的项目中
``` shell
git push origin master
```

### 6、新建 pull request

&emsp;&emsp;在自己的项目中，点击`New pull request` -> `Create pull request`
