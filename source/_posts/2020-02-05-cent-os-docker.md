---
title: 前端学习 Docker 之旅（三）—— Ubuntu 24.04、Cent OS 7.6 中安装 Docker
urlname: cent-os-docker
tags:
  - Ubuntu
  - Cent OS
  - Docker
categories:
  - Linux
  - Ubuntu
  - Cent OS
author: liuxy0551
copyright: true
date: 2020-02-05 20:21:58
updated: 2020-02-05 20:21:58
---


&emsp;&emsp;Docker 官方要求 Linux 内核版本至少`3.8`以上。

<!--more-->


## Ubuntu 24.04

### 一、安装 Docker

&emsp;&emsp;更新系统并安装依赖

```shell
sudo apt update
sudo apt install -y ca-certificates curl
```

&emsp;&emsp;添加 Docker 官方 GPG 密钥

```shell
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

&emsp;&emsp;添加 Docker 软件源

```shell
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

&emsp;&emsp;安装 Docker

```shell
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 二、启动 Docker

&emsp;&emsp;启动并设置开机自启

```shell
sudo systemctl enable docker
sudo systemctl start docker
```

&emsp;&emsp;查看 Docker 状态

```shell
sudo systemctl status docker
```

&emsp;&emsp;可以让普通用户也能使用 Docker，把 deploy 加入 docker 用户组

```shell
sudo usermod -aG docker deploy
```

### 三、验证安装

```shell
# Docker 版本
docker -v
# Docker Compose 版本
docker compose version
```


## Cent OS 7.6

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


## 创建 Docker 代码

&emsp;&emsp;docker pull 实际下载镜像的是 Docker Daemon（后台服务），它不会自动继承当前 Shell 的代理配置。所以，即使服务器上的 curl 命令能通过 proxy 访问 Google，也不代表 docker pull 能走代理。

&emsp;&emsp;在 Ubuntu 24.04 上创建 Docker 的 systemd 配置目录：

``` shell
sudo mkdir -p /etc/systemd/system/docker.service.d
```

&emsp;&emsp;创建代理配置：

``` shell
sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf > /dev/null <<'EOF'
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:6990"
Environment="HTTPS_PROXY=http://127.0.0.1:6990"
Environment="NO_PROXY=localhost,127.0.0.1,::1"
EOF
```

&emsp;&emsp;重新加载配置并重启 Docker：

``` shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

&emsp;&emsp;检查 Docker 代理是否生效：

``` shell
sudo systemctl show --property=Environment docker
```



附：<a href="https://liuxianyu.cn/article/docker-b.html" target="_black">前端学习 Docker 之旅（二）—— 常用指令</a>
