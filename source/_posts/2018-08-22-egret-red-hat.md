---
title: 微信小游戏跳坑之旅 —— 使用白鹭引擎开发之创建项目
urlname: egret-red-hat
tags:
  - Egret
  - 微信小游戏
categories:
  - 前端
  - 微信小游戏
author: liuxy0551
copyright: true
date: 2018-08-22 20:29:30
updated: 2018-08-22 20:29:30
---


&emsp;&emsp;最近花了两周时间在微信小游戏里踩坑，觉得挺有意思的，在这里分享一下开发的过程，点此可查看项目 [RedHat](https://github.com/liuxy0551/RedHat/tree/master/gameDemo)。首先介绍一下基础：小游戏 [官网教程](https://developers.weixin.qq.com/minigame/dev/) 、腾讯课堂的课程： [白鹭教育 - 成语大挑战小游戏开发](https://ke.qq.com/course/287266)（视频中的资料链接：[https://pan.baidu.com/s/1kkrCUwn0hikPLVg11PPFAA](https://pan.baidu.com/s/1kkrCUwn0hikPLVg11PPFAA) 密码：`3gtt`）、B站的教程：[使用白鹭引擎快速开发微信小游戏最全指南](https://www.bilibili.com/video/av18131669?from=search&seid=12272566927635524397)。这个小游戏是一个跳跃类游戏，基于白鹭（Egret）引擎开发，选用该引擎的原因是目前其对小游戏的开发支持较好，可以少踩些坑。上张图展示一下，下图为首页：
![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/1.png)
<!--more-->


### 一、安装 Egret launcher

　　下载 [Egret launcher](https://www.egret.com/downloads/wing.html) 后安装，然后在引擎页选择安装 5.1.2 以上版本，推荐最新版本；在工具页下载 Egret Wing 3 ，这是一个编辑器，可以很方便地编辑 exml 格式的文件，更方便地布局页面。
等待引擎及 Egret Wing 3 安装好后即可进入项目页创建新的项目了。


### 二、创建新项目，熟悉 Egret Wing 3

#### 1、创建项目

　　在项目页点击 创建项目 ，然后输入项目名称和项目存放的路径，因为这个项目用到的是 EUI ，所有创建的是一个 EUI 项目，引擎版本选择刚刚下载的那个版本即可。
选择扩展库 建议勾选上 game 游戏库，也可以在开发的时候在添加到项目中，egret.setTimeOut 方法需要 game 游戏库的支持；第六个的 tween 缓动动画库是游戏中的物体缓动的必需库文件。舞台尺寸默认，
小游戏不支持 showAll 的缩放模式，需要更改，然后点击 创建 。

　　![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/5.png)

#### 2、发布编译项目

　　依据下图进行该项目的的发布设置，选中 微信小游戏 并 设为默认发布 ；然后填入自己的 AppID，在注册微信公众平台的时候一定要注意，在微信公众平台的 设置 > 基本设置 > 服务类目 中第一个
大类一定要选择 游戏 ，否则在编译项目后会提示无app.json，看过小游戏官网教程的话就知道小游戏加载的是 game.json ；填上项目名称后点击 确定 ，等待发布编译，之后操作下图中的第六步，打开
 Egret Wing 3，然后在该编辑器中进行编写代码。

　　![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/6.png)

#### 3、熟悉 Egret Wing 3

　　打开项目后可自行查看各个文件，感受一下每个文件是什么作用。其中 egretProperties.json 是一个很重要的文件，打开的时候确认 current 的值，如果是 web 的话，点击调试按钮的时候会弹出
 H5 页面查看小游戏的效果，更改为 wxgame 即可在点击调试按钮的时候直接打开微信开发者工具进行预览，下图左上角的箭头即指向调试按钮。前面提到的勾选 game 库，如果后期添加的话，需要在
  egretProperties.json 中按红框的格式添加，然后在终端输入 egret build -e 进行加载。

　　![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/8.png)

　　src 文件夹下的 Platform.ts 是 Egret 引擎和微信小游戏之间的桥接文件，主要功能是使用小游戏的 API ，Main.ts 文件是在该项目中加载 Platform.ts 文件。同时，为了避免混淆，在 src 文件夹下新建 
game 文件夹用于存放自己的游戏文件，右击game 文件夹选择 新建模板文件 > 新建 EUI 组件 ，输入类名后，修改 皮肤默认路径 ，也放到 resource 的 game 文件夹下，避免混淆。

　　![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/9.png)

　　可以对照我放在 [Github](https://github.com/liuxy0551/RedHat) 上的源码，每个新建的 EUI 组件全部采用单例模式编写，利于后期调用被其他组件调用该组件中的方法。下图中的红框即是快速布局功能区。

　　![](https://images-hosting.liuxianyu.cn/posts/egret-red-hat/10.png)



### 三、Egret 中重要的 API

　　因为 Egret 不止是针对微信小游戏的引擎，所以其官网资料体系比较大，对小游戏有用的主要是以下几个：

　　开发者中心 > 文档 > [Egret Engine 2D](http://developer.egret.com/cn/github/egret-docs/Engine2D/update/update527/index.html)、[Egret 扩展库](http://developer.egret.com/cn/github/egret-docs/extension/threes/instructions/index.html) 、
[Egret API](http://developer.egret.com/cn/apidoc/) 、[Egret 教学示例](http://developer.egret.com/cn/example/egret2d/index.html#010-disp-basic) 、[Egret 交流社区](http://bbs.egret.com/portal.php) 。

　　其中在这个项目中比较重要的几个点分别为： 滚动控制容器 、setTimeOut 、缓动动画及其 wait 延迟方法 、碰撞检测 、缓动动画的暂停与恢复 、通过深度值获取子对象来设置参数（深度管理） 、Timer定时器（后期剔除）等，在 [GamePage.ts](https://github.com/liuxy0551/RedHat/blob/master/gameDemo/src/game/GamePage.ts) 中可查看具体用法。

　　因为发布需要软著登记，所有暂时不发布了，先玩玩单机版的吧。
