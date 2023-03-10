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


&emsp;&emsp;最近后台管理系统中的项目遇到了选择时间时需要加以限制的问题，记录一下。
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

![](https://images-hosting.liuxianyu.cn/posts/element-ui-date-picker/1.png)
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

![](https://images-hosting.liuxianyu.cn/posts/element-ui-date-picker/2.png)
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

![](https://images-hosting.liuxianyu.cn/posts/element-ui-date-picker/3.png)
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

![](https://images-hosting.liuxianyu.cn/posts/element-ui-date-picker/4.png)
![](https://images-hosting.liuxianyu.cn/posts/element-ui-date-picker/5.png)
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
