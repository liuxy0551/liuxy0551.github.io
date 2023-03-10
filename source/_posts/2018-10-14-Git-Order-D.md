---
title: Git 常用命令（四）—— 合并分支且保留合并记录
urlname: git-order-d
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-14 18:12:22
updated: 2019-12-13 12:17:15
---


　　git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`合并分支`：
<!--more-->


###  一、合并 develop 到 master

　　项目开发中将自己的代码提交到 develop，发布前将 develop 合并到 master：

　　1、在 develop 提交代码后，切换到 master 更新代码：
    ``` shell
    git checkout master
    git pull origin master
    ```

　　2、合并分支：
    ``` shell
    git merge develop
    ```

　　3、提交远程仓库：
    ``` shell
    git push origin master
    ```


###  二、合并分支且保留合并记录

　　因为 git 创建、合并、删除分支都非常快，所以 git 鼓励使用分支完成任务，合并后再删除分支，这和直接在 master 分支上工作效果是一样的，但是过程更加安全。
通常合并分支时，如果可以的话，git 会用`Fast forward`模式，但这种模式下，删除分支后会丢失分支信息。如果想要看出分支信息，可以强制禁用`Fast forward`模式，git 就会在 merge 时生成一个新的 commit。

　　1、切换到 master 拉取代码：
    ``` shell
    git checkout master
    git pull origin master
    ```

　　2、合并 develop 分支，请注意`--no-ff`参数，表示禁用`Fast forward`模式：
    ``` shell
    git merge --no-ff -m 'merge develop with no-ff' develop
    ```
　　因为本次合并要创建一个新的 commit，所以加上 -m 参数，把 commit 描述写进去。合并后，可以使用`git log`查看分支历史。
    ``` shell
    $ git log
    
    *   e1e9c68 (HEAD -> master) merge with no-ff
    |\  
    | * f52c633 (dev) add merge
    |/  
    *   cf810e4 conflict fixed
    ...
    ```
