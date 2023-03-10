---
title: 微信小程序实现左右滑动功能
urlname: wechat-scroll-left-right
tags:
  - 微信小程序
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2020-10-16 17:13:38
updated: 2020-10-16 17:13:38
---


&emsp;&emsp;最近写了个教育机构的微信小程序，其中有个批阅的功能，产品希望切换题目的时候能通过左右滑动切换上一题下一题，说是客户抖音玩多了，记录一下实现方法。

<!--more-->



### 一、实现效果

![](https://liuxianyu.cn/image-hosting/posts/wechat-scroll-left-right/1.gif)


### 二、实现方法

&emsp;&emsp;在需要滑动的区域加上触摸事件的监听，文档可参考 <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E8%AF%A6%E8%A7%A3" target="_black">事件详解</a>。主要使用到三个事件touchstart、touchmove、touchend，思路是：

> `touchstart` 记录开始的位置，标识已开始移动；`touchmove` 记录移动的距离，超过设定的移动距离即认为进行了滑动操作；`touchend` 标识结束移动

&emsp;&emsp;代码如下：

``` javascript
<template>
  <div @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <!--监听滑动的区域-->
  </div>
</template>

<script>
  import wepy from '@wepy/core'

  wepy.page({
    data: {
      // 监听左右滑动
      startX: '', // 横向移动开始的位置
      endX: '', // 横向移动结束的位置
      moveFlag: true // 判断是否在滑动
    },
    methods: {
      // 手指触摸动作开始
      touchStart (e) {
        this.startX = e.touches[0].pageX // 开始触摸时的原点
        this.moveFlag = true
      },
      // 手指触摸后移动 50 为设定的移动距离
      touchMove (e) {
        this.endX = e.touches[0].pageX // 结束触摸时的原点
        if (this.moveFlag) {
          if (this.endX - this.startX > 50) {
            console.log('上一题')
            this.moveFlag = false
          }
          if (this.startX - this.endX > 50) {
            console.log('下一题')
            this.moveFlag = false
          }
        }
      },
      // 手指触摸动作结束
      touchEnd () {
        this.moveFlag = true
      }
    }
  })
</script>
```


<br><br>

>**注意**
>* **touchstart、touchmove、touchend 为微信官方提供的 api，均为小写，对应的方法按习惯使用了驼峰命名。**


