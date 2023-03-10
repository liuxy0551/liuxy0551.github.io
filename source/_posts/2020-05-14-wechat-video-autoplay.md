---
title: 微信 H5 自动播放视频防止全屏
urlname: wechat-video-autoplay
tags:
  - HTML
categories:
  - 前端
  - HTML
author: liuxy0551
copyright: true
date: 2020-05-14 19:07:09
updated: 2020-05-14 19:07:09
---


&emsp;&emsp;记录一下微信 H5 中如何防止自动播放视频时打开全屏。
<!--more-->


```html
<video 
  ref="videoRef" 
  controls 
  preload 
  :src="videoUrl" 
  x5-video-player-type="h5-page"
  playsinline="true"
  x5-playsinline=""
  webkit-playsinline="true"
></video>
```
