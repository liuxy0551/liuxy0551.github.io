---
title: PC 和移动端实现长按效果
urlname: long-press
tags:
  - HTML
  - JavaScript
categories:
  - 前端
  - HTML
author: liuxy0551
copyright: true
date: 2020-06-20 14:26:02
updated: 2020-06-20 14:26:02
---

&emsp;&emsp;最近公司有个项目甲方想要个点赞的效果，有长按事件的身影，记录一下。

<!--more-->


#### 1、实现效果

![](https://images-hosting.liuxianyu.cn/posts/long-press/1.gif)


#### 2、HTML
``` html
<div
  class="thumb-up-icon"
  oncontextmenu='self.event.returnValue=false'
  @touchstart="addStart"
  @touchend="addStop"
  @touchmove="addStop"
  @mousedown="addStart"
  @mouseup="addStop"
  @mouseout="addStop"
  @click="thumbUp">
</div>
```

>**注意**
>* `oncontextmenu='self.event.returnValue=false'`禁用右键点击
>* `touch`是移动端的方法
>* `mouse`是 PC 端的方法


#### 3、Script
``` javascript
<script>
  import ThumbsUpAni from '../portal/canvas'

  export default {
    name: 'ThumbUp',
    data() {
      return {
        thumbsUpAni: null,
        timer: null
      }
    },
    methods: {
      // 添加 icon
      thumbUp () {
        this.thumbsUpAni.start()
      },
      // 持续添加 icon
      addStart () {
        this.timer && this.addStop()
        this.timer = setInterval(() => {
          this.thumbUp()
        }, 80)
      },
      // 停止添加 icon
      addStop () {
        clearInterval(this.timer)
      }
    },
    mounted () {
      this.thumbsUpAni = new ThumbsUpAni()
    }
  }
</script>
```


#### 4、附件
1、点赞的 canvas 文件：<a href="https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/long-press/canvas.js" target="_black">canvas.js</a>
2、点赞的组件代码：<a href="https://github.com/liuxy0551/liuxy0551.github.io/blob/master/assets/posts/long-press/ThumbUp.vue" target="_black">ThumbUp.vue</a>
3、点赞图标：<a href="https://images-hosting.liuxianyu.cn/posts/long-press/thumb-up.png" target="_black">thumb-up.png</a>



