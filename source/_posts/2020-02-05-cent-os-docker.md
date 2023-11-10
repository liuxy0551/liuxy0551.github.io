---
title: 前端学习 Docker 之旅（三）—— Cent OS 中安装 Docker
urlname: cent-os-docker
tags:
  - Cent OS
  - Docker
categories:
  - Linux
  - Cent OS
author: liuxy0551
copyright: true
date: 2020-02-05 20:21:58
updated: 2020-02-05 20:21:58
---


&emsp;&emsp;Docker 官方要求 Linux 内核版本至少`3.8`以上。

<!--more-->


### 一、Cent OS 版本

``` shell
cat /etc/redhat-release
```

``` shell
uname -r
```

![](https://images-hosting.liuxianyu.cn/posts/cent-os-docker/1.png)


### 二、设置 yum 源 `可选`

&emsp;&emsp;选择其中一个：阿里仓库`【推荐】`、中央仓库

``` shell 阿里仓库
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
``` shell 中央仓库
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo
```


### 三、安装 Docker

``` shell
yum install docker-ce -y
```


### 四、启动 Docker

&emsp;&emsp;1、root 用户操作：

``` shell 开机自启动 Docker
systemctl enable docker
```

``` shell 启动 Docker
systemctl start docker
```

&emsp;&emsp;2、查看 Docker 是否安装成功：

``` shell
docker -v
```


附：<a href="https://liuxianyu.cn/article/docker-b.html" target="_black">前端学习 Docker 之旅（二）—— 常用指令</a>
