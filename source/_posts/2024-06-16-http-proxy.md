---
title: 远程服务器使用本地代理
urlname: http-proxy
tags:
  - Cent OS
  - Linux
categories:
  - Cent OS
author: liuxy0551
copyright: true
date: 2024-06-16 23:07:38
updated: 2024-06-16 23:07:38
---


&emsp;&emsp;在服务器端经常遇到下载速度慢的问题，在服务端安装 clash 或者 v2ray 等又比较麻烦，可以临时使用本地的代理达到科学上网的目的。这里**需要区分 `局域网内服务器` 和 `公网服务器`**，记录下细节。

<!--more-->


### 一、局域网内服务器

&emsp;&emsp;之前将一台放在家里旧笔记本电脑安装了 CentOS 作为服务器学习用，属于局域网内的机器，原则上公网无法访问。家里还有一台 Windows 台式机，可以通过 clash 科学上网，安装了远程开机卡和 ToDesk 自启动，方便在公司远程开机。笔记本和 Windows 台式机都是通过 WiFi 接入网络的，因此处于同一个局域网。公司的 Mac 偶尔带回家，这里也设置下。需要开启 clash 的 `允许局域网连接`：

![](https://images-hosting.liuxianyu.cn/posts/http-proxy/1.png)

&emsp;&emsp;将旧笔记本电脑的别名改为 `lenovo`，在 `lenovo` 上 `vim ~/.zshrc` 添加以下命令：

``` shell
MACIP='192.168.31.23'
WINIP='192.168.31.108'
# 使用代理服务器(MacOS)
alias proxym='export https_proxy=http://$MACIP:7890;export http_proxy=http://$MACIP:7890;export all_proxy=socks5://$MACIP:7890'
# 使用代理服务器(Windows)
alias proxyw='export https_proxy=http://$WINIP:7890;export http_proxy=http://$WINIP:7890;export all_proxy=socks5://$WINIP:7890'
# 取消使用代理服务器
alias unproxy='unset http_proxy;unset https_proxy;unset all_proxy'
# 测试服务器是否可用
alias proxy_test='curl -v google.com'
```

&emsp;&emsp;在 `lenovo` 上添加完上述命令后执行 `source ~/.zshrc` 就可以生效了。此时可以执行 `proxy_test` 测试代理是否可用，发现一直是 Trying；执行 `proxy` 后再执行 `proxy_test` 就发现有具体内容返回了；可以通过执行 `unproxy` 取消代理。

![](https://images-hosting.liuxianyu.cn/posts/http-proxy/2.png)



### 二、公网服务器

&emsp;&emsp;公网服务器可以借助 `ssh -R` 命令创建一个反向代理通道（**下方 ssh 命令在本地机器执行，本地机器需要科学上网**）：

``` shell
ssh -N -T \
  -o ExitOnForwardFailure=yes \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -R 6990:127.0.0.1:7890 \
  root@47.65.55.62
```

- `ssh -R` 表示建立一个反向 SSH 隧道
- `6990` 是在公网服务器上监听的端口
- `127.0.0.1` 表示本地机器的回环地址（SSH 客户端所在机器）
- `7890` 是本地机器代理服务的端口，这里使用的是 Clash
- `root@47.65.55.62` 表示公网服务器的用户名和 IP 地址
- `-N` 表示不执行远程命令，仅建立隧道连接
- `-T` 表示不分配伪终端，适用于纯端口转发场景
- `-o ExitOnForwardFailure=yes` 表示如果端口转发建立失败（例如远程 6990 端口被占用），SSH 立即退出
- `-o ServerAliveInterval=30` 表示每隔 30 秒向服务器发送一次保活消息
- `-o ServerAliveCountMax=3` 表示连续 3 次未收到服务器响应后，断开 SSH 连接

&emsp;&emsp;因此上述命令的作用是：将本地的 `7890` 端口映射到公网服务器 `47.65.55.62` 的 `6990` 端口，当公网服务器有请求发送到公网服务器的 `6990` 端口时，它会通过 SSH 隧道转发到本地机器的 `7890` 端口。


&emsp;&emsp;类似的，在公网服务器上也添加下方的 `proxy` 命令，然后执行 `source ~/.zshrc` 就可以生效了。在公网服务器执行 `proxy_test` 测试代理是否可用，发现一直是 Trying；执行 `proxy` 后再执行 `proxy_test` 就发现有具体内容返回了；可以通过执行 `unproxy` 取消代理。

``` shell
# 开启代理（通过 SSH 反向隧道连接 Mac 本机 Clash）
alias proxy='export HTTP_PROXY=http://127.0.0.1:6990; export HTTPS_PROXY=http://127.0.0.1:6990; export ALL_PROXY=http://127.0.0.1:6990; export http_proxy=$HTTP_PROXY; export https_proxy=$HTTPS_PROXY; export all_proxy=$ALL_PROXY'
# 取消代理
alias unproxy='unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy'
# 测试代理
alias proxy_test='curl -v google.com'
```

![](https://images-hosting.liuxianyu.cn/posts/http-proxy/3.png)

>**注意**
>* **先在本地机器执行 `ssh -R` 命令，再在公网服务器执行 `proxy` 使用代理**
>* **`ssh -R` 命令的 `-N` 参数需要有，否则就会直接登录公网服务器的终端了**
>* **`ssh -R` 命令执行后会要求终端活跃，关闭终端或停止 `ssh -R` 命令都会停止代理**
>* **当公网服务器上的端口被占用时，`ssh -R` 命令执行会有 Warning 提示，代理会失败**



### 三、其他

- 当 `ssh` 连接断开后，`proxy` 也就失效了，自启动或全局生效等可以自行研究；
- `ssh -R` 命令的作用是将远程服务器的端口映射到本地机器的端口，这也可以实现局域网内的服务在公网访问，不仅仅是代理的作用；

