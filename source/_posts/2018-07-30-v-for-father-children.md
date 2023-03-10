---
title: Vue 编程之路（三）—— Vue 中子组件在父组件的 v-for 循环里，父组件调取子组件的事件
urlname: v-for-father-children
tags:
  - Vue
  - 父子组件
categories:
  - 前端
  - Vue
author: liuxy0551
copyright: true
date: 2018-07-30 18:12:22
updated: 2018-07-30 18:12:22
---


　　最近公司的一个项目中使用 Vue 2.x + Element UI 实现一个后台管理系统的前端部分，属于商城类型。
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/9.gif)
<!--more-->


### 一、前期思路：

　　其中在“所有订单”页面，UI 给的设计页面如下：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/1.png)

　　UI 理解：每个 Tab 点击后展现的页面都是这样的管理表格，所以这一部分表格写成组件。一开始采用的写法是下面这样的：

　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/2.png)

　　上图，前期实现。写完觉得代码很繁复，我在实现状态标识 + 对应的数量时，也发现上述写法不利于将 label 绑定为动态数值，转换思路和后端老哥沟通后改造了接口，返回数据的时候添加一下各个状态及其对应的数量。


### 二、最终的实现思路：

　　基于简化代码的思想，决定将这些 tabs 用循环的方式展现出来，写法如下：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/3.png)

　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/4.png)
　　<center>上图，定义的 tabList。</center>

　　因为要显示相应的数量，从接口中拿数据后与 tabList 进行拼接，不过给各位的参考意义不大，处理如下：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/5.png)

　　下图将体现解决方法的核心，那就是带上对应的数组下标，即何时调用：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/6.png)

　　我采用的逻辑是点击不同的 Tab 标签，携带不同的参数去请求数据，上图显示在返回的数据 order 有变化时，将变化后的 order 传值给子组件的 getOrderList 方法进行处理。这个时候就要解答标题了，因为 tabs 是循环出来的， console.log(this.$refs.child) 将显示类似下图：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/7.png)

　　可以看出已经成了一个数组，这时候就需要我们加上下标再去调用相应的 tab 子组件方法，如下图，确定 tabList 的 index：
　　![](https://liuxianyu.cn/image-hosting/posts/v-for-father-children/8.png)


### 三、写在最后

　　1、为何不像 [Vue 编程之路（一）——父子组件之间的数据传递](https://liuxianyu.cn/article/data-father-child.html) 中介绍的直接传值？

　　直接传值在前期写法中尝试过，那时连请求数据都是在子组件中进行，所以有很多莫名其妙的 bug，比如每次请求数据后会再请求一次全部状态的数据，导致显示异常，转换思路后在父组件请求数据，按 Tab 标签分发对应的数据，这就需要将 Tab 标签的数据传入子组件的方法进行处理。

　　2、子组件在父组件中进行 v-for 循环前，因为 this.$refs.child 还不是数组，所以可以直接点出子组件的方法，这也是调用子组件方法的实现方案。

　　特殊点就是子组件在父组件中进行 v-for 循环后， this.$refs.child 会变成一个数组，这时候再调用子组件的方法就要带上数组的下标了，这个下标如何来，可以参考这篇随笔第二部分的实现思路。
