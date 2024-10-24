---
title: 使用 vuex-persistedstate 持久化 vuex
urlname: vuex-persistedstate
tags:
  - vue
categories:
  - 前端
  - vue
author: liuxy0551
copyright: true
date: 2020-08-18 13:25:29
updated: 2020-08-18 13:25:29
---

&emsp;&emsp;vuex 的持久化可避免刷新页面就更新状态，记录一下简单使用。

<!--more-->


### 一、所有模块持久化

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

let moduleFiles = require.context('./modules', true, /\.js$/)
let modules = {}
moduleFiles.keys().forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[moduleName] = moduleFiles(modulePath).default
})

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules
})
```


### 二、部分模块持久化

&emsp;&emsp;仅针对某个模块持久化时，代码如下：
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import app from './modules/app'
Vue.use(Vuex)

export default new Vuex.Store({
  // state 持久化，防止f5刷新，导致数据消失
  plugins: [createPersistedState({
    storage: window.localStorage,
    reducer (val) {
      return {
        // 只保存module user内部所有变量持久化
        user: val.user
      }
    }
  })],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user
  }
})
```



### 三、/modules/user.js

```javascript
export default {
  namespaced: true,
  state: {
    accessToken: '',
    userInfo: null,
    bayonet: null,
    corpId: '',
  },
  getters: {},
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    setCorpId: (state, corpId) => {
      state.corpId = corpId
    },
    setBayonet: (state, bayonet) => {
      state.bayonet = bayonet
    }
  },
  actions: {}
}
```


