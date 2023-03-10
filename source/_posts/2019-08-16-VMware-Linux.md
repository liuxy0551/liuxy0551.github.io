---
title: 在 VMware Fusion 中安装 Cent OS 7.6 版本的虚拟机
urlname: vmware-linux
tags:
  - VMware
  - Linux
  - Cent OS
categories:
  - Linux
  - Cent OS
author: liuxy0551
copyright: true
date: 2019-08-16 22:59:48
updated: 2019-08-16 22:59:48
---


今天突然想在 Mac OS 上感受一下虚拟机的乐趣。尝试了 VirtualBox（安装夜神模拟器时不知道怎么就同时安装了）、Parallels Desktop、VMware Fusion 之后，发现还是 VMware Fusion 更有以前在 Windows 上使用虚拟机的熟悉感，所以以下内容基于 VMware Fusion。
<!--more-->


### 一、 下载 Linux 镜像

　　1、Cent OS：[https://www.centos.org](https://www.centos.org) [下载页面](https://www.centos.org/download/) 在下载页面选择 DVD  进入镜像选择页面，第一个是华为云上的镜像，我在杭州，所以我选择了第二个浙大的镜像。其实华为云的更快点：[http://mirrors.huaweicloud.com/centos/7.6.1810/isos/x86_64/CentOS-7-x86_64-DVD-1810.iso](http://mirrors.huaweicloud.com/centos/7.6.1810/isos/x86_64/CentOS-7-x86_64-DVD-1810.iso)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/1.png)

　　2、Ubuntu：[https://ubuntu.com](https://ubuntu.com) 华为云上的多版本镜像地址[http://mirrors.huaweicloud.com/repository/ubuntu-releases/16.04/](http://mirrors.huaweicloud.com/repository/ubuntu-releases/16.04/) 也可以在 [下载页面](https://launchpad.net/ubuntu/+cdmirrors?_ga=2.223681115.1514728070.1565962868-1880279007.1565962868) 滚动到 China 的部分，选择合适的镜像地址


### 二、 几种虚拟机软件给我的感受

　　1、VirtualBox
　　准备再感受一下虚拟机的时候，想起来上次安装夜神模拟器模拟安卓的时候，给我安装了一个 VirtualBox，所以先拿它试一试。但是页面 UI 感觉不是很好看（其实我第一时间想到的就是和 Easy UI 类似的风格） `pass`

　　2、Parallels Desktop
　　同事推荐的，之前也在另一个同事的电脑上感受过安装的 Windows 虚拟机，确实看起来不错，但是我使用虚拟机的过程基本都是依赖 VMware，所以用起来不是很习惯，最后还是用起了 VMware。在网上看到 Parallels Desktop 也可以做安卓模拟器，准备后期更一篇相关的随笔，这个软件先保留在电脑里

　　3、VMware Fusion
　　和我在 Windows 上使用的 VMware Workstation 风格基本一致，新建虚拟机的步骤也差不多，不再赘述，可参考以前的一篇随笔 [在 VMware 中安装 MacOS High Sierra 10.13](https://liuxianyu.cn/article/vmware-macos.html)。软件需要收费，自行解决


### 三、 安装 Cent OS 7.6

　　1、安装 GNOME 版本，多图
    {% gp 8-4 %}
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/2.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/3.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/4.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/5.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/6.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/7.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/8.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/9.png)
    {% endgp %}
    {% gp 8-4 %}
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/10.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/11.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/12.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/13.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/14.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/15.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/16.png)
    ![](https://liuxianyu.cn/image-hosting/posts/vmware-linux/17.png)
    {% endgp %}
    
    
### 四、基础配置

#### 1、ifconfig

　　如果 ifconfig 报错，在 root 用户下执行：
    ``` shell
    yum install net-tools -y
    ```
    
　　参考：[Cent OS 7 最小安装完成后，ifconfig 命令用不了](https://www.cnblogs.com/cy60/p/9287856.html)

<table>
	<tr>
		<td>用户名</td>
		<td>root</td>
		<td>liuxy</td>
	<tr>
	<tr>
		<td>密码</td>
		<td>123456</td>
		<td>1234</td>
	<tr>
	<tr>
		<td>IP</td>
		<td colspan="2">192.168.131.137（变化的）</td>
	<tr>
</table>

#### 2、-bash: vim: 未找到命令

##### 2.1、查看 vim 数据包
``` shell
rpm -qa |grep vim
```

##### 2.2、安装 vim 相关文件
``` shell
yum install -y vim-minimal
yum install -y vim-common
yum install -y vim-enhanced
```

##### 2.3、绝招

　　如果还是不生效，执行：
``` shell
yum install -y vim*
```

　　参考：[【linux】-bash: vim: 未找到命令](https://blog.csdn.net/oqqHun123/article/details/93742893)

#### 3、将 liuxy 加入 sudo 权限

``` shell
vim /etc/sudoers
```

　　像如下配置 sudoers
```
# User privilege specification  
root        ALL=(ALL:ALL) ALL  
liuxy    ALL=(ALL:ALL) ALL 
```
