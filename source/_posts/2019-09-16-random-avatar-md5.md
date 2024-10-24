---
title: Vue 项目中生成类似 GitHub 的随机头像
urlname: random-avatar-md5
tags:
  - md5
categories:
  - 前端
  - vue
author: liuxy0551
copyright: true
date: 2019-09-16 15:42:39
updated: 2019-09-16 15:42:39
---


　　最近个人项目中有头像需求，就想起 GitHub 的随机头像，通过 `identicon.js` 和 `blueimp-md5` 两个第三方库实现了，记录一下。
<!--more-->


### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/random-avatar-md5/1.png)


### 二、封装组件 - avatar.vue

```
<template>
  <img class="avatar" :src="url">
</template>

<script>
  import Identicon from 'identicon.js'
  import md5 from 'blueimp-md5'

  export default {
    props: {
      num: [Number]
    },
    computed: {
      url() {
        return 'data:image/png;base64,' + new Identicon(md5(this.num || 0), 420).toString()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>

```


### 参考资料

1、[identicon.js](https://github.com/stewartlord/identicon.js)
2、[JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)
