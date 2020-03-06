---
title: wepy 常用指令
urlname: wepy-command
tags:
  - wepy
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2020-03-06 20:44:30
updated: 2020-03-06 20:44:30
---


　　记录一下 wepy 框架常用指令
<!--more-->


[wepy 1.x 文档](https://wepyjs.github.io/wepy-docs/1.x)、[wepy 2.x 文档](https://wepyjs.github.io/wepy-docs/2.x)、[微信小程序wepy框架开发资源汇总](https://github.com/aben1188/awesome-wepy)

#### 1、全局安装指定版本（2.x）

``` shell
npm i @wepy/cli@2.0.0-alpha.20 -g
```

#### 2、查看当前项目 wepy 版本

``` shell
npx wepy -v
```

#### 3、生成开发实例（2.x）

　　因为 wepy 2.x 是 alpha 版本，所以一直不是很稳定，可能创建失败，临时解决方法见 [修改 Hosts 文件临时解决 raw.githubusercontent.com 无法访问的问题](https://liuxianyu.cn/article/hosts-githubusercontent.html)

``` shell
wepy init standard myproject
```

#### 4、开发实时编译（更新缓存）

``` shell
wepy build --no-cache --watch
```
