---
title: Cent OS 中安装 Docker
urlname: cent-os-docker
tags:
  - Cent OS
categories:
  - Cent OS
author: liuxy0551
copyright: true
date: 2020-02-05 20:21:58
updated: 2020-02-05 20:21:58
---


　　我是虚拟机装的 Cent OS，在这个 Cent OS 上安装的 Docker，Docker 官方要求 Linux 内核版本至少 3.8 以上。
<!--more-->


### 一、Cent OS 版本

#### 1、Linux 版本号
``` shell
cat /etc/redhat-release
```

#### 2、Linux 内核信息
``` shell
uname -r
```

![](/images/posts/cent-os-docker/1.png)


### 二、安装 Docker

#### 1、更新 yum
``` shell
sudo yum update -y
```

#### 2、安装需要的软件包

　　yum-util 提供 yum-config-manager 功能，另外两个是 devicemapper 驱动依赖的：
``` shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```


### 三、设置 yum 源

　　选择其中一个：中央仓库、阿里仓库

``` shell 中央仓库
sudo yum-config-manager --add-repo http://download.docker.com/linux/centos/docker-ce.repo
```
``` shell 阿里仓库
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```


### 四、查看 Docker 版本

``` shell
yum list docker-ce --showduplicates | sort -r
```


### 五、安装 Docker

　　我选的是 18.03.1.ce，命令如下：

``` shell
yum install docker-ce-18.03.1.ce
```


### 六、启动 Docker

``` shell 启动 Docker
systemctl start docker
```
``` shell 开机自启动 Docker
systemctl enable docker
```


附：[前端学习 Docker 之旅（二）—— 常用指令](https://liuxianyu.cn/article/docker-b.html)
