---
title: CSS 某个元素 hover 时显示另一个元素
urlname: css-hover-show
tags:
  - CSS
categories:
  - 前端
  - Vue
  - Sass
author: liuxy0551
copyright: true
date: 2021-03-07 20:46:03
updated: 2021-03-07 20:46:03
---

&emsp;&emsp;最近在项目有个鼠标移到按钮上旁边显示二维码的需求，简化理解为`某个元素 hover 时显示另一个元素`，记录下解决方法。

<!--more-->

![](https://liuxy0551.gitee.io/image-hosting/posts/css-hover-show/1.gif)


### 实现思路：

- 二维码是按钮的子组件
- 二维码是默认隐藏的`display: none;`
- 当鼠标移到按钮上即按钮处于`hover`状态时，二维码显示`display: block;`


### 代码示例

#### HTML

```html
<div class="bottom-btn">
  <div class="qrcode-box">
    <img class="qrcode-img" src="../assets/images/a-10.png" alt="">
    <div class="text">手机扫码下载安装</div>
  </div>
</div>
```

#### CSS

```css
  .bottom-btn {
    width: 232px;
    height: 57px;
    background-image: url("../assets/images/a-6.png");
    background-size: 100% 100%;
    cursor: pointer;
    &:hover .qrcode-box {
      display: block;
    }
    .qrcode-box {
      width: 234px;
      height: 261px;
      margin-top: 40px;
      background-image: url("../assets/images/a-9.png");
      background-size: 100% 100%;
      text-align: center;
      display: none;
      .qrcode-img {
        width: 120px;
        height: 120px;
        border-radius: 4px;
        margin: 58px auto 5px;
      }
      .text {
        color: #1A64FF;
        font-size: 14px;
      }
    }
  }
```

#### 添加动画

&emsp;&emsp;按如下代码更换：

```css
&:hover .qrcode-box {
  /*display: block;*/
  opacity: 1;
  transform: translateY(0);
}

.qrcode-box {
  /*display: none;*/
  opacity: 0;
  transition: all 0.4s;
  transform: translateY(50%);
}
```

>**注意**
>* **如果按钮、二维码有一个相同的父元素，.father:hover .qrcode-box { display: block; } 就可以实现类似的效果了。**


#### 参考资料：

&emsp;&emsp;<a href="https://www.cnblogs.com/csuwujing/p/9949379.html" target="_black">css鼠标悬浮控制元素隐藏与显示</a>
