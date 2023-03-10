---
title: 利用 canvas 实现简单图片滤镜
urlname: canvas-image-filter
tags:
  - canvas
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2021-07-16 10:37:40
updated: 2021-07-16 10:37:40
---


&emsp;&emsp;最近会做一次周分享，主题是 canvas 图片滤镜，记录下为此写的 demo。在线访问：<a href="https://liuxy0551.github.io/canvas-image-filter/index.html" target="_black">https://liuxy0551.github.io/canvas-image-filter/index.html</a>


<!--more-->

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/normal.png)


### 一、什么是 canvas

&emsp;&emsp;`canvas`是一个 HTML 元素，也叫 canvas 画布。Canvas API 主要绘制 2D 图形，而同样使用`canvas`元素的 WebGL API 一般用于绘制硬件加速的 2D 和 3D 图形。


### 二、常用图像 API 接口

&emsp;&emsp;关于图像处理的 API，主要有 4 个：

#### 2.1、绘制图片

&emsp;&emsp;`drawImage(image, x, y, dwidth, dheight)`

&emsp;&emsp;其中`image`是 image 或 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标，`dwidth`和`dheight`是生成图像的宽高。

``` javascript
let img = new Image() // 声明新的Image对象
img.src = "./img/photo.png"
// 图片加载后
img.onload = () => {
  canvas = document.querySelector("#my-canvas")
  ctx = canvas.getContext("2d")
  // 根据image大小，指定canvas大小
  canvas.width = img.width
  canvas.height = img.height
  // 绘制图像
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}
```

#### 2.2、获取图像数据

&emsp;&emsp;`getImageData(x, y, width, height)`

&emsp;&emsp;其中`x`和`y`是将要被提取图像区域的左上角坐标，`width`和`height`是将要被提取图像区域的宽高。返回一个`ImageData`对象，包含 canvas 给定矩形区域的图像数据。

``` javascript
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
```

#### 2.3、重写图像数据

&emsp;&emsp;`putImageData(imageData, x, y)`

&emsp;&emsp;其中`imageData`是`getImageData`方法返回的`ImageData`对象，`x`和`y`分别是源图像数据在目标画布中 x 轴 和 y 轴的偏移量。

``` javascript
ctx.putImageData(imageData, 0, 0) // 重绘图像
```

#### 2.4、导出图像

&emsp;&emsp;`toDataURL([type, encoderOptions])`

&emsp;&emsp;其中`type`代表图片格式，默认为 image/png，`encoderOptions`是指在`type`设置为 image/jpeg 或 image/webp 时，可以从 0 到 1 设置图片的质量，默认 0.92。

更详细的 API 和参数说明请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D" target="_black">MDN CanvasRenderingContext2D</a>


### 三、常见滤镜效果

&emsp;&emsp;实现滤镜主要借用`getImageData`方法，返回每个像素的 RGBA 值，操作像素进行不同的运算即可得到不同的滤镜效果。

#### 3.1、去色效果

&emsp;&emsp;相当于黑白照片，定义以下公式：`gray = red * 0.3 + green * 0.59 + blue * 0.11`

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/1.png)

#### 3.2、底片效果

&emsp;&emsp;底片效果就是 RGB 最大值减去当前值，即 255 - 当前值：

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/2.png)

#### 3.3、单色效果

&emsp;&emsp;单色效果是将当前像素的其他色值去除，比如显示红色时将 green、blue 可以设置为 0：

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/3.png)

#### 3.4、黑白效果

&emsp;&emsp;通过判断当前像素的色值是否超过某一个标定值，大于则显示黑色，否则显示白色，即可达到效果。这个标定值可以设定为 RGB 最大值的一半，也就是 128：

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/4.png)

#### 3.5、荧光效果

![](https://liuxianyu.cn/image-hosting/posts/canvas-image-filter/5.png)


### 四、代码

[1] <a href="https://github.com/liuxy0551/canvas-image-filter" target="_black">https://github.com/liuxy0551/canvas-image-filter</a>
