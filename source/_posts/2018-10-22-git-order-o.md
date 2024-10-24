---
title: Git 常用命令（十五）—— Git 设置代理
urlname: git-order-o
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2021-04-30 17:55:42
updated: 2021-04-30 17:55:42
---


&emsp;&emsp;git clone github 仓库时常出现超时，设置下代理可以很好的解决问题。

<!--more-->

#### 设置代理

&emsp;&emsp;`https` 也可以改为 `http`；`7890` 是 clash 的代理服务端口。`--global` 表示全局设置。

``` bash
git config --global https.proxy https://127.0.0.1:7890
```

#### 取消代理

``` bash
git config --global --unset https.proxy
```

#### 查看代理

``` bash
git config --global --get https.proxy
```
