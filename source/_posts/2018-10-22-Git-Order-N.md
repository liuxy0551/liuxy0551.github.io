---
title: Git 常用命令（十四）—— Git 批量删除分支
urlname: git-order-n
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2021-04-30 16:55:42
updated: 2021-04-30 16:55:42
---


&emsp;&emsp;在日常工作中，每个需求会单独切一个分支，通过 MR 合入公共分支的同时可以在 MR 勾选删除源分支，日积月累就会导致本地有很多分支且对应的远程分支已经被删除。这里记录下如何快速清理这些分支。

<!--more-->

**清理前**

&emsp;&emsp;确认即将清理的本地分支是已经 merged 的分支，避免丢失分支。同时分支名有一定规律则方便批量删除。

![](https://images-hosting.liuxianyu.cn/posts/git-order/4.png)


### 批量删除本地分支

``` bash
git branch |grep 'feat_5.2.x_' |xargs git branch -D
```

![](https://images-hosting.liuxianyu.cn/posts/git-order/5.png)

### 批量删除远程分支

``` bash
git branch -r| grep 'feat_5.2.x_' | sed 's/origin\///g' | xargs -I {} git push origin :{}
```

![](https://images-hosting.liuxianyu.cn/posts/git-order/6.png)

