---
title: CentOS 最小化安装
urlname: centos7-minimal
tags:
  - Cent OS
  - Linux
categories:
  - Cent OS
author: liuxy0551
copyright: true
date: 2022-12-09 12:43:09
updated: 2022-12-09 12:43:09
---


&emsp;&emsp;记录一下将闲置电脑改造成远程服务器的过程。记录一下将闲置电脑改造成远程服务器的过程。

<!--more-->


### 连接网络

&emsp;&emsp;开机后登录，输入以下命令测试网络情况，会报错：`Name or service not know`。

``` shell
ping www.baidu.com
```

#### 有线网络

&emsp;&emsp;建议笔记本电脑使用下方 `WiFi 设置的第一种方案` 先连上网络。

&emsp;&emsp;**请插上网线，执行 `reboot` 命令重启设备。**执行以下命令查看网卡状态：

``` shell
nmcli d
```

![](https://images-hosting.liuxianyu.cn/posts/centos7-minimal/1.png)

&emsp;&emsp;一般会显示已经连接上网络，此时执行 `ip addr` 或 `ip route` 命令查看 IP 地址：

![](https://images-hosting.liuxianyu.cn/posts/centos7-minimal/2.png)

#### WiFi

&emsp;&emsp;后续会通过 WIFI 连接网络，输入以下命令连接 WiFi：

##### 第一种（不推荐）

&emsp;&emsp;以下命令重启设备时不会主动再次连接 WiFi，建议仅在初次使用时进行联网，联网后按照第二种方案设置。

``` shell
ip link set wlp2s0 up
wpa_supplicant -B -i wlp2s0 -c <(wpa_passphrase your_wifi_name your_wifi_password)
dhclient wlp2s0
```

&emsp;&emsp;`wlp2s0` 是上述 `nmcli d` 命令查询出来的 WiFi 网卡名称，完成后 ping 网络测试。

##### 第二种（推荐）

&emsp;&emsp;输入以下命令连接 WiFi：

``` shell
nmcli --ask dev wifi connect your_wifi_name password your_wifi_password
```

&emsp;&emsp;会报错：`No Wi-Fi device found`，执行 `yum install NetworkManager-wifi -y` 后执行 `reboot` 命令重启设备。

&emsp;&emsp;然后再执行上述命令即可连接成功，查看 WIFI 自动分配的局域网 IP，可以通过 SSH 工具连接设备了（如果连不上可以重启下设备）。


### 忽略合盖、电源键

&emsp;&emsp;闲置设备可能是笔记本，此时忽略笔记本的合盖休眠很有必要，同时将电源键忽略。

``` shell
vi /etc/systemd/logind.conf
```

&emsp;&emsp;将其中的 `HandlePowerKey` 的值改为 `ignore`，`HandleLidSwitch` 的值改为 `lock` 并去除两者最前方的 `#` 注释。

&emsp;&emsp;执行 `reboot` 命令重启生效，这样就可以忽略电源键，并且合盖时仅锁屏，设备不会休眠。


### 常用工具

[Cent OS 基础环境搭建 | 刘先玉](https://liuxianyu.cn/article/cent-os-base.html)

#### 更新所有包

``` shell
yum update -y
```

#### ifconfig

&emsp;&emsp;执行 `yum search ifconfig`，然后安装查询到的结果：

``` shell
yum install net-tools.x86_64 -y
```

#### 其他常用工具

``` shell
yum install wget vim lsof -y
```

#### git

&emsp;&emsp;通过 yum 安装 git `yum install git -y`，版本会比较老（不推荐）。

&emsp;&emsp;**通过下载最新版的源文件并编译（推荐）**：

``` shell
cd /mnt
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.44.0.tar.gz
tar -zxvf git-2.44.0.tar.gz
cd git-2.44.0
yum install -y gcc-c++ curl-devel zlib-devel autoconf
```

``` shell
./configure --prefix=/usr/local
make && make install
```

``` shell
git --version
```

### 查看电池状态

``` shell
yum install upower -y
```

``` shell
upower -i $(upower -e | grep BAT) | grep --color=never -E "state|to\ full|to\ empty|percentage"
```
