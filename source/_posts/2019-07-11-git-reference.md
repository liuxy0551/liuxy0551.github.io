---
title: 改动第三方库 - git 后仅个人使用
urlname: git-reference
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2019-07-11 11:16:15
updated: 2019-07-11 11:16:15
---


这里不提以下需求的具体实现，记录一下如何把第三方开源库按自己的逻辑修改后仅供个人使用。
> 最近看到一个项目中的需求——在微信 H5 中实现类似抖音的功能，挺有兴趣的，想尝试着看自己能不能实现这样的需求。过程中在 GitHub 上看到有别人封装的库 [wechat-h5-video](https://github.com/tclyjy/wechat-h5-video)，引入一下后感觉可以实现类似的功能，但是有些地方需要改动，可惜第三方库引入后改动源文件发布后也就还原了。这里不提需求的实现，记录一下如何把第三方开源库按自己的逻辑修改后仅供个人使用。
<!--more-->

>**`以下申明`**
>* **原仓库**：[wechat-h5-video](https://github.com/tclyjy/wechat-h5-video)
>* **使用范围**：仅用作个人项目代码练习，侵权必删，其他第三方仓库同理


### 一、 引用第三方库、改动第三方库

　　1、在项目中按实际需求引用第三方库之后，发现有些地方需要改动，这个时候可以去 node_modules 文件夹中的第三方库直接改动

　　2、上述操作不利于后续再次利用改动后的第三方库，同时假如 node_modules 文件夹被清除，或者更换电脑写该项目，则改动不同步


### 二、 git 改动后的第三方库

　　1、想要解决上述的担忧，可以将第三方库改动后的代码放到 git 仓库中，同时在 package.json 文件中引用

　　2、因为原作者的 [wechat-h5-video](https://github.com/tclyjy/wechat-h5-video) 项目是在 GitHub 上，所以我 Fork 了一下这个项目 [https://github.com/liuxy0551/wechat-h5-video](https://github.com/liuxy0551/wechat-h5-video)，
 将 Fork 后的代码在本地 clone 并打开，再将之前改动的代码替换掉 clone 的代码，然后上传到 git 仓库

　　3、在需要引入该第三方库的项目中改动 package.json 文件，将版本号指向 git 仓库的地址，如下图：
    ![](https://images-hosting.liuxianyu.cn/posts/git-reference/1.png)



>**注意**
>* **使用范围**：仅用作个人项目代码练习，侵权必删，其他第三方仓库同理
>* **使用范围**：仅用作个人项目代码练习，侵权必删，其他第三方仓库同理
>* **使用范围**：仅用作个人项目代码练习，侵权必删，其他第三方仓库同理
