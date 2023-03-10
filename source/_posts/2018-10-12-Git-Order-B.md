---
title: Git 常用命令（二）—— clone 远程仓库到本地
urlname: git-order-b
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-12 18:12:22
updated: 2019-12-13 11:30:07
---


　　git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`clone 远程仓库到本地`：
<!--more-->


### 一、clone 项目到本地

　　1、两种 clone 操作

　　（1）输入以下命令，就会进入主分支。其中 git clone 后的内容为你要下载的项目地址，newLearnGit 是本地目录：
    ``` shell
    git clone https://github.com/liuxy0551/learnGit.git
    git clone https://github.com/liuxy0551/learnGit.git newLearnGit
    ```

　　（2）clone 指定分支，就会进入指定分支。输入以下命令：
    ``` shell
     git clone -b develop https://github.com/liuxy0551/learnGit.git
    ```
    
　　格式为：git clone -b + 分支名 + 远程仓库地址

　　2、本地分支和远程分支

   命令|说明
    :-------- | :--------
    git branch -a | 查看所有分支列表，包括本地仓库和远程仓库
    git checkout dev | 切换分支 dev
    git checkout -b dev | 本地仓库创建 dev 分支，同时切换到 dev 分支。只有提交的时候才会在远程仓库创建一个分支


### 二、切换到指定远程分支

`git checkout --track origin/develop` 可以缩写为：

``` shell
 git checkout -t origin/develop
```
等同于
``` shell
 git checkout -b develop origin/develop
```


### 三、创建并跟踪远程分支

`git push origin develop --set-upstream` 可以缩写为：

``` shell
 git push origin develop -u
```
