---
title: Git 常用命令（八）—— 几种撤销操作和覆盖仓库
urlname: git-order-h
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2018-10-18 16:52:50
updated: 2019-12-30 16:52:50
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`几种撤销操作和覆盖仓库`：

<!--more-->


###  一、git add 之前撤销文件更改

&emsp;&emsp;`git checkout --<file>...`修改 bug 时，发现尝试的方法不合适，当前所有改动的代码不想要了，可以执行：

``` shell
git checkout .
```


###  二、git add 之后取消暂存文件

&emsp;&emsp;`git reset HEAD <file>...`修改 bug 时，发现改好了，准备提交时发现有个非公共文件不需要提交，但是这个时候已经 git add 暂存文件了，可以执行：

``` shell
git reset --hard
```

###  三、git commit 之后撤回提交

&emsp;&emsp;`git reset HEAD~<number>`修改 bug，提交后发现这次提交的内容是错误的，则应该撤回这次提交，意思就是让 HEAD 这个指针指向其他地方，可以执行：

``` shell
git reset HEAD~
```
&emsp;&emsp;`~`之后不填则默认为 1，数字代表撤销几次提交。


### 四、覆盖已经 push 到线上仓库的内容`谨慎`

&emsp;&emsp;偶尔需要在测试服务器多次测试效果，将代码提交到 develop 分支然后通过 Jenkins 打包发布到测试环境，但是这些进行测试的 commit 不太好看，记录一下覆盖的操作：

``` shell
git reset HEAD~
git add .
git commit -m 'commit message'
git push -f origin develop
```

>**注意**
>* **`-f`在多人协作时出现是可能会被其他人砍死的**
