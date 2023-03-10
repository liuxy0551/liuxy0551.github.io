---
title: 使用 webpack 的 require.context 函数实现前端自动化引入
urlname: require-context
tags:
  - webpack
categories:
  - 前端
  - webpack
author: liuxy0551
copyright: true
date: 2020-08-18 11:11:32
updated: 2020-08-18 11:11:32
---

&emsp;&emsp;`require.context`是 webpack 中用于生成上下文模块的一个方法，传入要搜索的目录，将目录下所有模块通过正则表达式匹配后 require 进来，新增模块时无需再依次引入。可参考 <a href="https://webpack.js.org/guides/dependency-management/#requirecontext" target="_black">官方文档</a>

<!--more-->


### 一、require.context

&emsp;&emsp;官方示例接收四个参数：

```javascript
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync');
```

| 参数名 | 含义 |
| :---: | --- |
| directory | 要查询的目录 |
| useSubdirectories | 是否要查询子孙目录，默认值为 false |
| regExp | 要匹配的文件的后缀，是一个正则表达式 |
| mode | 模块加载模式，常用值为 sync、lazy、lazy-once、eager |




### 二、使用 require.context

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let moduleFiles = require.context('./modules', true, /\.js$/)
let modules = {}
moduleFiles.keys().forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = moduleFiles(modulePath).default
})

export default new Vuex.Store({
  modules
})
```



### 三、未使用 require.context

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    permission,
    settings,
    tagsView,
    user
  }
})
```
