---
title: Element UI 日期选择器时间选择范围限制
urlname: element-ui-date-picker
tags:
  - Element UI
categories:
  - 前端
  - Vue
  - Element UI
author: liuxy0551
copyright: true
date: 2019-04-02 20:29:30
updated: 2019-04-02 20:29:30
---

## 介绍

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近后台管理系统中的项目遇到了选择时间时需要加以限制的问题，记录一下。
<!--more-->


　　DatePicker 组件代码：
```
    <el-date-picker
            v-model="time"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
    </el-date-picker>
```

### 一、选择今天及今天以后的日期

![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Element_UI_DatePicker/1.png)
```
    data() {
      return {
        time: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    }
```


### 二、选择今天及今天以前的日期

![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Element_UI_DatePicker/2.png)
```
    data() {
      return {
        time: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        }
      }
    }
```


### 三、选择今天以后的日期（不含今天）

![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Element_UI_DatePicker/3.png)
```
    data() {
      return {
        time: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }
      }
    }
```


### 四、选择三个月之前到今天的日期

![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Element_UI_DatePicker/4_1.png)
![](https://raw.githubusercontent.com/liuxy0551/liuxy0551.github.io.jekyll/master/images/posts/Element_UI_DatePicker/4_2.png)
```
    data() {
      return {
        time: '',
        pickerOptions: {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;
          }
        }
      }
    }
```
