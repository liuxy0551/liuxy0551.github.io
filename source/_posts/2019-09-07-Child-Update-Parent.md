---
title: Vue 编程之路（四）——子组件更新父组件的数据
urlname: child-update-parent
tags:
  - Vue
  - 父子组件
categories:
  - 前端
  - Vue
  - 父子组件
author: liuxy0551
copyright: true
date: 2019-09-07 23:36:30
updated: 2019-09-07 23:36:30
---


　　最近遇见了子组件更新父组件数据的需求，总结一下使用的方法以及一些区别
<!--more-->


### 一、sync 修饰符`推荐`

　　1、组附件调用子组件传值时加上 sync 修饰符
    ```
    <InputSearch :show.sync="show"></InputSearch>
    ```

　　2、子组件中可以这样更新父组件的值
    ``` javascript
    this.$emit('update:show', false)
    ```

>**注意**
>* 要定义对应的变量去传值，如：show，不可以直接传 true 之类的实际值

### 二、this.$parent

　　1、不使用修饰符，通过 this.$parent 进行改变
    ``` javascript
    this.$parent.show = false
    ```

### 三、sync 修饰符和 this.$parent 的区别

　　两种方法的关键区别在于：
　　1、第一种方法是显式的操作数据，而第二种是隐式的操作数据，隐式容易导致逻辑混乱；
　　2、第二种方法更新父组件的数据对于父组件来说是完全被动的，父组件本身并不知情，很容易在父组件毫不知情的情况下被某个子组件更新了数据；
　　3、Vue 的`单向数据流`理念中，一个组件的状态只能由组件自身和父组件改变，子组件只能提交事件并任由其父组件处理，这个机制保证组件对自身的状态总是充分知情，这样才能保障代码逻辑的健壮性。


>**推荐**
>* **推荐使用 sync 修饰符**
