---
title: Git 常用命令（十二）—— Git 项目设置用户名、邮箱
urlname: git-order-l
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2021-04-29 16:10:20
updated: 2021-04-29 16:10:20
---


&emsp;&emsp;git 常用命令系列随笔会记录一些用到的常见命令，这里记录一下`Git 项目设置用户名、邮箱`：

<!--more-->

### 一、全局配置

&emsp;&emsp;公司电脑可以全局设置 Git 的用户名和密码：

```
git config –global user.name "git repository userName"
git config –global user.email "git repository email"
```

```
git config –global user.name "liuyi"
git config –global user.email "liuyi@dtstack.com"
```

```
git config -l
```


### 二、单独配置

&emsp;&emsp;有时候会在公司电脑上处理一些 github 上的项目，这个时候使用单独的用户名和邮箱比较好，在项目路径下执行：

```
git config user.name "git repository userName"
git config user.email "git repository email"
```

```
git config user.name "liuxy0551"
git config user.email "liuxy0551@qq.com"
```

```
git config -l
```

&emsp;&emsp;`git config -l`查看的是全局配置 + 当前项目的单独配置，使用时会优先使用当前项目的单独配置。
