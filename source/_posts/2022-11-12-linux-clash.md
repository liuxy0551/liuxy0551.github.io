---
title: Cent OS 安装使用 clash
urlname: linux-clash
tags:
  - Cent OS
  - Linux
categories:
  - Cent OS
author: liuxy0551
copyright: true
date: 2022-11-12 08:16:46
updated: 2022-11-12 08:16:46
---


&emsp;&emsp;记录下在 Cent OS 中安装使用 clash 的过程。

<!--more-->


#### 1、创建目录

```shell
cd /mnt && mkdir clash
```

#### 2、下载 clash 并解压

```shell
wget https://github.com/Dreamacro/clash/releases/download/v1.11.12/clash-linux-amd64-v1.11.12.gz
```

&emsp;&emsp;最新版本可在 [https://github.com/Dreamacro/clash](https://github.com/Dreamacro/clash/releases) 查看，执行以下命令解压并将二进制文件重命名为 clash。

```shell
gzip -d clash-linux-amd64-v1.11.12.gz
mv clash-linux-amd64-v1.11.12 clash
```

#### 3、下载配置文件

&emsp;&emsp;在 clash 二进制文件的目录下执行以下命令下载你的 clash 配置文件。

```shell
wget -o config.yaml "配置文件的 url"
```

#### 4、启动 clash

```shell
./clash -d .
```

&emsp;&emsp;上述命令会启动 Clash，同时启动 HTTP 代理和 Socks5 代理；在上述命令后加上`&`，可以后台运行。如果提示权限不足，请执行`chmod +x clash`。

>**注意**
> 当出现如下报错时，请执行以下命令下载文件并重命名为`Country.mmdb`，参考：[clash issue 854](https://github.com/Dreamacro/clash/issues/854)
> INFO[0000] Can't find MMDB, start download

```shell
wget "https://raw.githubusercontent.com/wp-statistics/GeoLite2-Country/master/GeoLite2-Country.mmdb.gz"
gzip -d GeoLite2-Country.mmdb.gz
mv GeoLite2-Country.mmdb Country.mmdb
```

#### 5、下载静态页面 可选

- （1）第三方 https://github.com/haishanh/yacd

```shell
wget https://github.com/haishanh/yacd/archive/gh-pages.zip
unzip gh-pages.zip
rm -rf gh-pages.zip
mv yacd-gh-pages/ clash-dashboard/
```

- （2）https://github.com/Dreamacro/clash-dashboard

&emsp;&emsp;下载后自行 build，使用 dist 文件夹

``` yaml config.yaml
port: 7890
secret: '' # 访问密码
external-controller: 0.0.0.0:7891 # 静态页面地址
external-ui: clash-dashboard # 静态页面文件夹
```

访问`server ip:7891/ui`：

![](https://images-hosting.liuxianyu.cn/posts/linux-clash/1.png)

#### 6、启用/停用代理

```shell 启用临时代理
export http_proxy=127.0.0.1:7890
export http_proxys=127.0.0.1:7890
```

可以通过`cat $http_proxy`来查看是否启用了临时代理

```shell 停用临时代理
unset http_proxy
unset https_proxy
```
