---
title: 修改 Hosts 文件临时解决 raw.githubusercontent.com 无法访问的问题
urlname: hosts-githubusercontent
tags:
  - Hosts
  - github
categories:
  - Hosts
author: liuxy0551
copyright: true
date: 2020-03-06 19:20:07
updated: 2020-03-06 19:20:07
---


　　最近利用 wepy 2.x 创建项目的时候发现，因为 wepy 2.x 是 alpha 版本，所以一直不是很稳定，无法访问 [https://raw.githubusercontent.com](https://raw.githubusercontent.com) 。
<!--more-->


#### 1、查询真实 IP

　　通过 [https://www.ipaddress.com/](https://www.ipaddress.com/) 查询到`raw.githubusercontent.com`的真实 IP 地址：

![](https://images-hosting.liuxianyu.cn/posts/hosts-githubusercontent/1.png)


#### 2、修改 Hosts 文件

``` shell
vim /etc/hosts
```

添加如下内容保存即可。

```
199.232.68.133 raw.githubusercontent.com
```
