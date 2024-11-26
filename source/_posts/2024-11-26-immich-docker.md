---
title: 53k star! 高颜值的开源相册工具 —— immich
urlname: immich-docker
tags:
  - Linux
categories:
  - Linux
author: liuxy0551
copyright: true
date: 2024-11-26 09:42:38
updated: 2024-11-26 09:42:38
---


&emsp;&emsp;最早之前使用的是百度网盘备份视频和照片，近两年用的是不怎么限速的阿里网盘。近期想从百度网盘下载点东西，限速后太过费劲，所以准备弃用，开了个 SVIP，将所有文件全部下载到了硬盘。同理，担心后续阿里网盘限速，虽然视频照片这类资源备份后基本不怎么再次下载，但本着我不下载但你不能限速的原则，找到了一个开源的相册备份应用 `immich`。

<!--more-->

&emsp;&emsp;也对比过一些其他的开源软件，比如 NextCloud，但是个人觉得还是 immich 更好用。最近用了一段时间，体验还不错，内网下上传照片极快，也有对应手机平台的 APP 支持，体验较好。这里记录下通过 docker compose 安装 immich 的过程和一些改动。


### 一、环境与链接

&emsp;&emsp;**最好能有科学上网**，[远程服务器使用本地代理](https://liuxianyu.cn/article/http-proxy.html)

- 硬件：中柏 n100 pro Ⅱ 16G + 512G
- 系统：Ubuntu 24.04
- 官网：https://immich.app/


### 二、安装

#### 2.1 安装 docker

&emsp;&emsp;我是通过 docker compose 安装的，简单记录下如何安装 docker compose：

``` shell 安装 docker
# Add Docker's official GPG key:
sudo apt update -y
sudo apt install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
docker -v
```

``` shell 安装 docker compose
sudo apt update -y
sudo apt install docker-compose-plugin -y
docker compose version
```


#### 2.2 docker-compose.yml

``` shell 存储相关文件
mkdir -p /mnt/docker/immich-app
cd /mnt/docker/immich-app
```

&emsp;&emsp;官网的安装步骤在这里：https://immich.app/docs/install/docker-compose/。下载 `docker-compose.yml` 和配置文件 `.env`，如果有硬件加速的能力（N 卡之类的硬件）可以点开官网文档查看，这里不进行。

``` shell
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

&emsp;&emsp;`vim .env` 追加时区：`TZ=Asia/Shanghai`

``` shell
docker compose up -d
```

&emsp;&emsp;稍等片刻即可访问，默认端口是 `2283`。我这里是在局域网其他电脑访问的：http://192.168.31.101:2283。第一次进入会有一些初始化的设置。


#### 2.3 大模型

&emsp;&emsp;immich 强大在可以支持大模型处理，能够标注人脸和按文字搜索照片。上传一定量图片后，如果左侧 探索 功能中还是没有人脸，可能是由于服务器端存在网络问题，此时需要在服务器端准备好大模型。在 `docker-compose.yaml` 文件同级新建 `model_cache` 文件夹，然后执行：

``` shell
cd /mnt/docker/immich-app
mkdir -p model-cache/clip model-cache/facial-recognition
```

&emsp;&emsp;这里我们会用到两个大模型 [XLM-Roberta-Large-Vit-B-16Plus](https://huggingface.co/immich-app/XLM-Roberta-Large-Vit-B-16Plus/tree/main) 和 [buffalo_l](https://huggingface.co/immich-app/buffalo_l/tree/main)，分布用于中文搜索（以文搜图）和人脸识别。用到的的相关文件我都放到了 [夸克云盘 immich-docker](https://pan.quark.cn/s/f623f75acd2a)，也可以自行下载。

&emsp;&emsp;我们需要分别下载并解压到 `model-cache/clip` 和 `model-cache/facial-recognition` 目录下。因为仓库文件较大，需要借助 [git-fls](https://github.com/git-lfs/git-lfs/releases)：

``` shell
tar -zxvf git-lfs-linux-amd64-v3.6.0.tar.gz
cd git-lfs-3.6.0
sudo ./install.sh
git lfs install
```

> **注意：** 大模型的路径是有讲究的。

``` shell
cd /mnt/docker/immich-app/model-cache/clip
git clone https://huggingface.co/immich-app/XLM-Roberta-Large-Vit-B-16Plus
```
``` shell
cd /mnt/docker/immich-app/model-cache/facial-recognition
git clone https://huggingface.co/immich-app/buffalo_l
```

![](https://images-hosting.liuxianyu.cn/posts/immich-docker/1.png)

&emsp;&emsp; `vim .env` 定义大模型的路径：

```
# model cache path
MODEL_CACHE=./model-cache
```

&emsp;&emsp;`vim docker-compose.yml` 使用大模型的路径：

![](https://images-hosting.liuxianyu.cn/posts/immich-docker/2.png)

&emsp;&emsp;分别使用两个大模型，然后 [在服务器端重启 immich](https://liuxianyu.cn/article/immich-docker.html#2-4-重启-immich)。

![](https://images-hosting.liuxianyu.cn/posts/immich-docker/3.png)
![](https://images-hosting.liuxianyu.cn/posts/immich-docker/4.png)

#### 2.4 重启 immich

``` shell
docker stop immich_server immich_machine_learning immich_redis immich_postgres
docker compose up -d
```

&emsp;&emsp;重启完成后，重新拉起相关的任务。

![](https://images-hosting.liuxianyu.cn/posts/immich-docker/5.png)

&emsp;&emsp;等待运行完成，搜索功能就有人脸分组了。

![](https://images-hosting.liuxianyu.cn/posts/immich-docker/6.png)


#### 2.5 更新 immich

&emsp;&emsp;进入 immich 时如果有更新提示，可以在服务器端执行：

``` shell
docker compose pull && docker compose up -d
```


### 三、卸载

&emsp;&emsp;如果体验后不想使用，可以按以下方式卸载：

``` shell
docker stop immich_server immich_machine_learning immich_redis immich_postgres
```

&emsp;&emsp;自行清理对应的容器和镜像，可以酌情删除 `/mnt/docker/immich-app` 文件夹。

