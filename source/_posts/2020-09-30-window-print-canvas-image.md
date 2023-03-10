---
title: 使用 window.print() 时将 DOM 中的 canvas 转为 image
urlname: window-print-canvas-image
tags:
  - canvas
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2020-09-30 17:32:40
updated: 2020-09-30 17:32:40
---


&emsp;&emsp;最近有个导出 pdf 的需求，尝试过程中遇到了 window.print() 导出时，内容区域有 echarts 图表，图表区域是个 canvas，导出后的 pdf 文件中 canvas 区域空白，记录一下解决方法。

<!--more-->


### 一、代码

``` javascript
  const oldInnerHtml = window.document.body.innerHTML

  const mainCanvas = document.getElementsByTagName('canvas')[0]
  const mainRef = this.$refs['mainRef']

  // 将 canvas 转为图片
  const mainImg = new Image()
  const mainImgSrc = mainCanvas.toDataURL('image/png')
  mainImg.src = mainImgSrc

  // 图片加载完成后
  mainImg.onload = () => {
    mainRef.innerHTML = `<img src=${ mainImgSrc }>` // 用图片替换 canvas

    window.document.body.innerHTML = this.$refs['reportPdfRef'].innerHTML
    window.print()
    window.document.body.innerHTML = oldInnerHtml
    // window.location.reload() // 或者刷新页面
  }
```


### 注意事项

>**注意**
>* **1、导出正常 pdf 后原先的 canvas 区域会空白**
>* **2、通过`window.location.reload()`可解决上一条问题，但是会刷新页面**
