---
title: Vue 编程之路（一）——父子组件之间的数据传递
urlname: data-father-child
tags:
  - Vue
  - 父子组件
categories:
  - 前端
  - Vue
author: liuxy0551
copyright: true
date: 2018-07-26 20:29:30
updated: 2018-07-26 20:29:30
---


　　最近公司的一个项目中使用 Vue 2.0 + element UI 实现一个后台管理系统的前端部分，属于商城类型。其中部分页面是数据管理页，所以有很多可以复用的表格，故引入自定义组件。
<!--more-->


### 一、父组件向子组件传值

　　![](https://liuxianyu.cn/image-hosting/posts/data-father-child/2.png)

　　上图，这边实现的是从父组件向子组件动态传值，传的是一个对象。在子组件上动态绑定要传入的对象，如果是静态数据（如："Hello World!"）则无需属性名前的冒号，并且需要在 components 中声明。

　　![](https://liuxianyu.cn/image-hosting/posts/data-father-child/3.png)

　　上图，首先创建 props ，然后在 props 中创建对应的属性名，之后即可在 template 中使用接收到的对象。

　　![](https://liuxianyu.cn/image-hosting/posts/data-father-child/4.png)

>**总结一下：  父组件向子组件传对象（值）成功**
>* 1、在父组件中注册并引用子组件
>* 2、使用子组件时在子组件上添加一个属性，并绑定上数据
>* 3、在子组件中创建 props ，在 props 中创建相同的属性名，用来接收数据
>* 4、把接收到的数据在子组件中使用

### 二、子组件向父组件传值

　　![](https://liuxianyu.cn/image-hosting/posts/data-father-child/5.png)

　　首先在子组件创建一个按钮，给这个按钮绑定一个点击事件。上图是子组件中又调用了其他的组件（分页组件），我这边是子组件把页码传递给父组件，父组件拿着页码去请求数据，原理和按钮绑定点击事件是相同的道理。

　　然后在方法中添加以下代码：
    ```
     pageChange(v){
         this.$emit('toPage', v)
     }
    ```
　　![](https://liuxianyu.cn/image-hosting/posts/data-father-child/6.png)

　　在父组件的子组件标签中监听该事件并添加一个响应事件来处理数据。点击分页组件上的页码按钮或点击创建的按钮，在响应事件中使用数据，可观察到传值成功。

>**总结一下：  子组件向父组件传值成功**
>* 1、子组件中需要发出该自定义事件，可以是按钮的点击事件，也可以是其他方式
>* 2、将需要传的值放在 $emit 第二个参数的位置，这个参数会被传给父组件中的响应方法
>* 3、需要在父组件中使用子组件并在子组件标签上绑定对事件的监听

**在通信中，无论是子组件向父组件传值还是父组件向子组件传值，他们都有一个共同点就是有中间介质，子向父的介质是自定义事件，父向子的介质是 props 中的属性。**
