---
title: 目录结构小工具 treer
urlname: project-treer
tags:
  - npm
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2020-08-25 15:57:57
updated: 2020-08-25 15:57:57
---

&emsp;&emsp;最近写了几个 npm 包，发现了一个比较好用的目录结构小工具 <a href="https://www.npmjs.com/package/treer" target="_black">treer</a>。

<!--more-->


#### 1、安装

&emsp;&emsp;建议在全局安装，无需写到 package.json。

``` shell
npm i treer -g
```


#### 2、使用

&emsp;&emsp;项目路径内，输入：

``` shell
treer -e ./result.txt -i '/node_modules|.git|.idea|.DS_Store/'
```


#### 3、处理

&emsp;&emsp;会在项目路径下生成一个`result.txt`文件，稍微处理一下即可得到美观的目录结构

```
syvue-cli
├─.gitignore
├─README.md
├─package-lock.json
├─package.json
├─bin
|  ├─index.js
|  ├─tools
|  |   ├─index.js
|  |   └templateConfig.js
|  ├─actions
|  |    └create.js
```

