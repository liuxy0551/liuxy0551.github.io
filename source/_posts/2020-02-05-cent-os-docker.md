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

``` Linux 版本号
cat /etc/redhat-release
```

``` Linux 内核信息
uname -r
```

![](https://liuxy0551.gitee.io/image-hosting/posts/cent-os-docker/1.png)


### 二、安装 Docker

#### 1、更新 yum

``` shell
yum update -y
```

#### 2、卸载旧版本（如果安装过旧版本）

```
yum remove docker docker-common docker-selinux docker-engine -y
```

#### 3、安装需要的软件包

&emsp;&emsp;yum-util 提供 yum-config-manager 功能，另外两个是 devicemapper 驱动依赖的：

``` shell
yum install yum-utils device-mapper-persistent-data lvm2 -y
```


### 三、设置 yum 源

&emsp;&emsp;选择其中一个：阿里仓库`推荐`、中央仓库

``` shell 阿里仓库
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
``` shell 中央仓库
yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo
```


### 四、查看可安装的 Docker 版本

``` shell
yum list docker-ce --showduplicates | sort -r
```


### 五、安装 Docker

&emsp;&emsp;我选的是 18.03.1.ce，命令如下：

``` shell
yum install docker-ce-18.03.1.ce -y
```


### 六、启动 Docker

&emsp;&emsp;1、root 用户操作：

``` shell 启动 Docker
systemctl start docker
```
``` shell 开机自启动 Docker
systemctl enable docker
```

&emsp;&emsp;2、查看 Docker 是否安装成功：

``` shell
docker -v
```


附：[前端学习 Docker 之旅（二）—— 常用指令](https://liuxianyu.cn/article/docker-b.html)
