---
title: Git 常用命令（一）—— 将本地仓库与多个远程仓库关联
urlname: git-order-a
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-11 18:12:22
updated: 2019-12-13 11:26:22
---


　　git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`将本地仓库与多个远程仓库关联`：
<!--more-->


###  将本地的项目与线上项目关联

　　这一部分主要作用是将本地项目备份到线上，达到多端操作的目的。以 Github 举例：

　　1、新建 repository
　　在 Github 下创建一个新的 repository，取名为 learnGit。

　　2、创建本地仓库
　　进入本地文件夹路径，执行以下命令创建本地仓库：
    ``` shell
     git init
    ```
　　
　　3、修改 .gitignore 文件
　　如果没有请手动创建一个，在里面加入忽略更新的内容，如`.idea`、`node_modules`等。

　　4、提交代码/文件
　　执行以下命令，完成代码/文件在本地的提交：
    ``` shell
     git add .
     git commit -m 'commit message'
    ```

　　5、设置远程仓库
    ``` shell
    git remote add origin https://github.com/liuxy0551/learnGit.git
    ```
　　如果出现问题：`fatal: remote origin already exists`，提示 origin 已存在，执行`git remote rm origin`删除别名再重复第 5 步即可
　　![](https://images-hosting.liuxianyu.cn/posts/git-order/1.png)

　　`一个本地仓库可以同时关联多个远程仓库`，依次关联即可：
    ``` shell
     git remote add github https://github.com/liuxy0551/learnGit.git
     git remote add gitee https://gitee.com/liuxy0551/learnGit.git
    ```
　　origin、github、gitee 均为别名，为了区分远程仓库。关联多个远程仓库的时候依次 push 即可：
    ``` shell
    git push github master
    git push gitee master
    ```

　　6、更新远程仓库
    ``` shell
    git pull origin master
    git push origin master
    ```

　　7、将本地新建的分支推到远程并和远程分支绑定
    ``` shell
    git push origin develop -u
    ```

　　8、将本地的 tag 全部推到远程仓库
    ``` shell
    git push origin --tags
    ```
