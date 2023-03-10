---
title: 前端项目优化之旅（四）—— Element 按需引入组件
urlname: vue-cli3-element-load-on-demand
tags:
  - Vue
  - Element UI
  - 项目优化
categories:
  - 前端
  - Vue
  - Element UI
author: liuxy0551
copyright: true
date: 2019-12-05 19:04:17
updated: 2019-12-05 19:04:17
---

&emsp;&emsp;`前端项目优化之旅`系列随笔主要记录工作中遇到的一些优化方案，这里记录一下 Vue CLI 3 项目中如何让 Element 按需引入组件。

<!--more-->


### 一、安装 Element

``` shell
npm i element-ui -S
```


### 二、完整引入

　　在 main.js 中写入以下内容：

``` javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```
![](https://liuxianyu.cn/image-hosting/posts/vue-cli3-element-load-on-demand/1.png)


### 三、按需引入

　　1、在`src/components`下新建`element.js`文件，具体代码见 [src/components/element.js](https://github.com/liuxy0551/vue-cli3-build-optimization/blob/master/src/components/element.js)

``` javascript
// 按需引入 Element 组件
import { Input, Select, Option } from 'element-ui'
let elementUIs = [Input, Select, Option]

export default {
  install (Vue) {
    elementUIs.forEach(elementUI => [
      Vue.component(elementUI.name, elementUI)
      // Vue.use(elementUI)    // 也可以使用 Vue.use()
    ])
  }
}
```

　　2、在`main.js`中引入`src/components/element.js`：

``` javascript
import element from './components/element'
Vue.use(element)
```

　　3、页面使用组件：

``` javascript
<el-input v-model.trim="msg" placeholder="请输入，最长 20 位，无空格" maxlength="20" clearable></el-input>
```
![](https://liuxianyu.cn/image-hosting/posts/vue-cli3-element-load-on-demand/2.png)


- 主要体现在 element 文件大小减少了约`1.5 MB`
