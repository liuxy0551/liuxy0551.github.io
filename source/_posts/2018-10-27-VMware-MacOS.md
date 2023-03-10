---
title: 在 VMware 中安装 MacOS High Sierra 10.13
urlname: vmware-macos
tags:
  - VMware
categories:
  - VMware
author: liuxy0551
copyright: true
date: 2018-10-27 20:29:30
updated: 2018-10-27 20:29:30
---


&emsp;&emsp;最近抽空把以前在 VMware 中安装 MacOS 的过程回忆了一下，同时在自己电脑上再次安装了一遍，记录一下，随笔图片较多。
<!--more-->


## 工具 / 原料

Windows 系统、VMware、unlocker（使得 VMware 可以识别到 MacOS）、MacOS High Sierra 10.13 镜像


## 方法 / 步骤

### 1、准备工作

　　(1) 这篇随笔记录的过程是在 Windows 系统上完成，准备工作需要在 Windows 上安装好 VMware，并下载好所需文件，`文件链接已失效`。其中文件夹是第二个压缩包解压后的文件，第一个压缩包备用，第三个压缩包就是 MacOS High Sierra 10.13 镜像。
　　
　　![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/36.png)

　　(2) 保证 VMware 运行需要的几个服务已经启动，没设置过这些服务手动启动的可忽略。VMware 在关闭状态时，解压 unlocker-master.zip 文件，进入解压的文件夹，右击 win-install.cmd 文件，以管理员运行，等待运行完成即可。VMware 软件运行时以管理员运行该文件可能会报错，如果没有运行完成的话，可能会在新建虚拟机的时候发现没有 Apple Mac OS X(M) 操作系统选项。

　　![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/1.png)

### 2、新建虚拟机，载入 MacOS

　　在完成以上准备工作后，就可以开始新建虚拟机载入 MacOS 了，后续步骤以图片为主。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/2.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/3.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/4.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/5.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/6.png)
{% endgp %}

　　下图中的内存和处理器的分配数量可依主机性能而定，多多益善。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/7.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/8.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/9.png)
{% endgp %}

　　    正常情况下，初次开启此虚拟机后会出现如下图的错误，unlocker 的开发者给出了解决方法：找到并打开安装目录下的 XXXX.vmx 文件，使用记事本打开后，在 smc.present = "TRUE" 后添加以下代码后保存，问题即可解决。
    ```
    smc.version = "0"
    ```

{% gp 2-2 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/10.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/11.png)
{% endgp %}

　　按上图修改安装文件后，再次点击开启此虚拟机，即可开始初次开机时系统的安装过程。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/12.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/13.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/14.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/15.png)
{% endgp %}

　　安装时会出现上图中的情况，只有一个磁盘。为了文件管理方便，我将磁盘抹掉并改名，然后将系统安装在新出现的磁盘上。点击继续后就是系统的安装过程，静候佳音。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/16.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/17.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/18.png)
{% endgp %}

　　接下来就是系统的一些基本设置。

{% gp 2-2 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/19.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/20.png)
{% endgp %}

### 3、安装 VMware Tools

&emsp;&emsp;VMware 中安装 VMware Tools 后，可支持自由拖拽的功能，鼠标也可以在虚拟机与主机之前自由移动（不用再按 Ctrl + Alt），且虚拟机屏幕也可以全屏了，好处多多。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/21.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/22.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/23.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/24.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/25.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/26.png)
{% endgp %}

　　安装完成后重启，会报错 - 系统扩展已被阻止，按照图片顺序设置，允许载入该系统软件。

{% gp 2-2 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/27.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/28.png)
{% endgp %}

<br>
　　允许载入后按上述步骤重新安装 VMware Tools。

{% gp 8-4 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/29.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/30.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/31.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/32.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/33.png)
{% endgp %}

<br>
　　安装完成后重启，按下图推出“ VMware Tools ”，这样桌面就很干净了。

{% gp 2-2 %}
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/34.png)
![](https://liuxianyu.cn/image-hosting/posts/vmware-macos/35.png)
{% endgp %}

<br>

>**注意**
>* unlocker 的储存路径不要有中文字符，否则会安装失败，而且没有失败的提示；
>* 有什么问题可以多重启，多百度。
>* 如果系统可以使用，尽量不更新；
