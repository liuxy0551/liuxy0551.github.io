---
title: Vue Mint-UI Datetime picker 中的起始时间和结束时间
urlname: data-time-picker
tags:
  - Vue
  - Mint UI
categories:
  - 前端
  - Vue
  - Mint UI
author: liuxy0551
copyright: true
date: 2018-11-19 20:29:30
updated: 2018-11-19 20:29:30
---


　　最近公司项目中用到出生日期的功能，使用了 [Mint UI 中的 Datetime picker](https://mint-ui.github.io/docs/#/zh-cn2/datetime-picker)，遇到的问题记录一下。
<!--more-->


### Datetime picker 效果

#### 1、官网效果

![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/1.gif)

　　官网上给出了一些 API 文档，但是 [Mint UI 的文档](https://mint-ui.github.io/docs/#/zh-cn2/datetime-picker) 写的真心不怎么样，这里分享一下 Mint UI 的源码，这里是 [Datetime picker](https://github.com/ElemeFE/mint-ui/blob/master/example/pages/datetime-picker.vue) 的源码。

![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/3.png)

&emsp;&emsp;既然是选择出生日期，那可选日期当然需要做一些限制，粗略地处理为 1900-01-01 ~ 当前时间。注意到文档中的 startDate 和 endDate 可以控制起止时间，但是没有说明如何使用，源码中也没有例子。如果我们直接设置时间格式的字符串，如 `startDate: "1901-01-01"`，这样写是会报错的。

![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/4.png)

　　根据上图可以看出传入 startDate 的值必须是 Date 类型，所以按下面的写法就可以了：
```
    startDate: new Date("1901-01-01"),
    endDate: new Date()
```
    
![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/5.png)
```
    <!--出生日期的picker-->
    <mt-datetime-picker ref="birthdayPicker" type="date" v-model="user.usbirthday" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                 :startDate="startDate" :endDate="endDate" @confirm="handleChange">
    </mt-datetime-picker>
```
    
　　v-model="user.usbirthday"中的 user.usbirthday 可以设置成 `this.user.usbirthday = 1995-01-01`。

![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/6.png)
```
    // 打开date-picker
    openPicker(picker) {
        this.$refs[picker].open();
    },
    // picker选择的日期改变
    handleChange(value) {
        this.birthday = moment(value).format('YYYY-MM-DD');
    }
```
    
#### 2、实现效果
    
![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/2.gif)

#### 3、引入 Moment.js

　　随笔中的代码涉及了 Moment.js，这是一个用来格式化时间的 js 插件，比如下图的时间不便于前端使用，则可以通过 Moment.js 将其转化为 `2018-11-19` 等格式的时间。

![](https://images-hosting.liuxianyu.cn/posts/data-time-picker/7.png)

　　安装方式： `npm i moment`

　　中文官网： [http://momentjs.cn/](http://momentjs.cn/)

　　Github： [https://github.com/moment/moment/](https://github.com/moment/moment/)

　　然后在 main.js 中添加下面两行代码来引入 Moment.js：
```
    // 引入moment用来格式化时间
    import moment from "moment";
    Vue.prototype.$moment = moment;
```
    
　　常用格式化：
```
    let date = moment(new Date("1901-01-01")).format("YYYY-MM-DD HH:mm:ss");
    let now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    
    console.log(date);        // 1901-01-01 08:00:00
    console.log(now);         // 2018-11-19 19:20:06
```
