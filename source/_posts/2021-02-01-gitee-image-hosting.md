---
title: Gitee 图床
urlname: gitee-image-hosting
tags:
  - Blog
categories:
  - Blog
author: liuxy0551
copyright: true
date: 2021-02-01 12:00:39
updated: 2021-02-01 12:00:38
---

&emsp;&emsp;博客的图片等媒体资源经历了几次波折，这次记录下用 Gitee 搭建图床存储博客图片等媒体资源，不借助 PicGo 是因为 Gitee 仓库中超过 1M 的图片需要登录后才能查看，对访客很不友好。

<!--more-->


### 一波三折

&emsp;&emsp;这个博客是用 Hexo 搭建的，图片等媒体资源经历过以下几次折腾：

#### 1、github

&emsp;&emsp;博客初期是用的 github pages，图片等媒体资源都在项目的文件夹中，由于国内的网络原因，经常出现图片加载失败、加载慢等情况。

#### 2、阿里云服务器

&emsp;&emsp;目前博客打包后放在我的阿里云服务器上，图片等媒体资源自然也是从服务器访问，由于服务器带宽有限，加载效果也不理想。

#### 3、七牛云

&emsp;&emsp;看了下七牛云每个月的免费流量，对这个博客来说够用了，便准备搬迁到七牛云，奈何搬迁初期发现七牛云的 https 访问是收费的，博客是 https 访问的，访问 http 资源会报错，故舍弃之。

#### 4、gitee

&emsp;&emsp;写这篇随笔之前，博客项目是同步部署到 gitee 上的，利用 gitee pages 功能部署项目，这样就能拿到图片等媒体资源的 https 链接了，无奈 gitee 每个项目的文件总大小限制了 1G，随着随笔的积累，日前部署时 gitee 的仓库已经推不上去了（保持微笑），遂准备将图片等媒体资源统统迁移到单独的 gitee 项目中，每满 1G 便新建一个项目（来自白嫖党的倔强）。


### Gitee 图床

#### 1、新建仓库

![](https://liuxianyu.cn/image-hosting/posts/gitee-image-hosting/1.png)

&emsp;&emsp;clone 该仓库，将图片等媒体资源按随笔分文件夹存放到这个仓库，push 到远程仓库。

#### 2、Gitee Pages

&emsp;&emsp;每次有新图片都需要更新（白嫖的无奈），看到有 <a href="https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoStargazers?ex=no" target="_black">Open API</a>，后续研究。

![](https://liuxianyu.cn/image-hosting/posts/gitee-image-hosting/2.png)
