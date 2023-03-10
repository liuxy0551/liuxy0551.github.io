---
title: 轻松搞定 Android 开发环境的搭建
urlname: Android-IDE
tags:
  - Android
categories:
  - 大学
  - Android
author: liuxy0551
copyright: true
date: 2017-03-30 17:54:30
updated: 2018-04-20 20:21:09
---


　　在Windows下安装Android的开发环境虽说不简单但也算不上复杂，本篇经验写给同为小白的朋友们，随笔步骤经作者测试正确可行，希望对准备进入Android开发的你有所帮助。
<!--more-->

### 一、JDK 的安装与环境变量的配置

　　选择 [Oracle公司官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 下载对应版本的 JDK 或者直接选择百度“JDK”下载。安装时 jre 尽量和 jdk 的文件夹分开，安装完成后出现两个文件夹 jdk 和 jre，接下来我们需要设置三个系统变量，右击	我的电脑 -> 属性 -> 高级系统设置 -> 系统设置 -> 环境变量 -> 系统变量，三个系统变量分别是：

|变量名|变量值|备注|
|----|----|----|
|JAVA_HOME|`E:\java\jdk1.8.0_121`|变量值为JDK在你电脑上的安装路径|
|CLASSPATH|`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`|注意变量值字符串前面有一个"."表示当前目录|
|Path|`;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`|Path属性已存在，可直接编辑，在原来变量后追加即可|

- 变量值中如果已经有内容，用 ; 隔开；
- 测试是否安装配置成功：Win + R，输入 cmd，按 Enter 继续，输入 javac，按 Enter，出现相关内容即证明安装配置成功。

### 二、下载安装 Eclipse

　　Eclipse 是一种 Java 应用程序及 Android 开发的 IDE（集成开发环境），不需要安装，下载后解压，剪切 eclipse 文件夹到你想安装的地方，打开时设置你的工作目录即日后各种项目的存放位置，此时已完成了普通 Java 应用程序的开发环境准备。本篇经验下载的是 [Eclipse IDE for Java EE Developers](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/oxygen/2/eclipse-jee-oxygen-2-win32-x86_64.zip) 版本，点击 `DOWNLOAD` 下载，然后等待浏览器下载。  


### 三、下载安装 Android SDK

#### 1、下载

　　我们要使用 Eclipse 来开发 Android 应用程序，那么需要下载 Android SDK 和在 Eclipse 中安装 ADT 插件，这个插件能让 Eclipse 和 Android SDK 关联起来。

　　打开 [http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)（没有梯子打不开）可下载 Android SDK。或者从下面两个网站下载  
[http://www.androiddevtools.cn/](http://www.androiddevtools.cn/)  

![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/6.png)


[http://tools.android-studio.org/index.php/sdk/](http://tools.android-studio.org/index.php/sdk/)  

![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/7.png)

#### 2、安装

　　下载完成后双击“installer_r24.4.1-windows.exe”，选择解压文件夹，完成后双击“SDK Manager”，加载可安装的安卓版本。下面是我的一些安装选项，仅供参考：

{% gp 4-2 %}
　　![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/1.png)
　　![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/2.png)
　　![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/3.png)
{% endgp %}


- 1、建议使用旧手机测试程序，旧手机是什么版本就勾选什么版本，无需多装其他版本，不宜贪多;
- 2、选好后点击安装，同意，开始安装，这一步非常耗时也经常出现安装失败的情况，安装失败的安装包重新勾选再安装。  


#### 3、安装 ADT（离线安装）

官网各版本下载链接：（本篇经验使用的是 ADT-23.0.6）

[https://dl.google.com/android/ADT-23.0.6.zip](https://dl.google.com/android/ADT-23.0.6.zip)  
[https://dl.google.com/android/ADT-23.0.4.zip](https://dl.google.com/android/ADT-23.0.4.zip)  
[https://dl.google.com/android/ADT-23.0.3.zip](https://dl.google.com/android/ADT-23.0.3.zip)  
[https://dl.google.com/android/ADT-23.0.2.zip](https://dl.google.com/android/ADT-23.0.2.zip)  
[https://dl.google.com/android/ADT-23.0.0.zip](https://dl.google.com/android/ADT-23.0.0.zip)  

　　启动 Eclipse，Help -> Install New Software，点击 Add… 按钮，名称可以用 ADT，然后点击 Archive 选择 ADT 的压缩包，点击 OK 选择要安装的工具，下一步。安装完成重启 Eclipse。可不进行：在 Eclipse 中点击 Window -> Preferences...，选择 Android：配置好你的 SDK 路径，则会出现刚才在 SDK 中安装的各平台包。  

![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/5.png)

　　到这里，Windows 系统上的 Android 开发环境就搭建完成了。在 Eclipse 中打开 File -> New -> Project 新建一个项目的时候，就可以看到建立 Android 项目的选项。测试运行程序可以连接 USB 线使用真机（需打开开发者模式中的 USB 调试功能），也可以使用此时已安装好的 Android SDK and AVD Manager 来创建虚拟设备。  

![](https://liuxianyu.cn/image-hosting/posts/Android-IDE/4.png)


- 下面的步骤可能已经不需要了：因为国内有墙，有时候会出现加载安卓版本失败的情况。从万能的百度搜索上，找到了解决这个问题的方法：

#### (1).更改 host 文件

　　在 C:\Windows\System32\drivers\etc 目录下，用记事本打开“hosts”文件，将下面两行信息加到 hosts 文件的末尾，保存退出。

  ```
  203.208.46.146 dl.google.com  
  203.208.46.146 dl-ssl.google.com
  ```

#### (2).将 SDK Manage 上的 https 请求更改成 http 请求

　　打开 SDK Manager，Tools -> Options，勾选 Force https://..sources to be fetched using http://... ，如图。退出重新打开 SDK Manager，一般情况下就可以正常加载了。


>* 安装多个安卓版本会十分耗时，耐心等待；
>* 建议安装测试设备对应的安卓版本或其他目标版本，多个版本很占用空间，不宜贪多。
