---
title: 滚动到顶部时吸附
urlname: scroll-fixed
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2020-12-22 14:50:13
updated: 2020-12-22 14:50:13
---

&emsp;&emsp;最近一个简单的官网项目中，有滑动到顶部时将标题栏吸顶的优化需求，记录一下。

<!--more-->

``` html
  <!--横标题部分-->
  <div class="px-title title" :class="{ 'fixed': fixed }">
    标题
  </div>
```

``` javascript
  data () {
    fixed: false
  },
  mounted () {
    // 滚动后吸顶
    window.addEventListener('scroll', () => {
      this.fixed = this.$refs['topBgRef'].getBoundingClientRect().bottom < 0
    }, true)
  }
```

``` css
  .px-title {
    &.fixed {
      width: 100%;
      box-shadow: 0 16px 16px -20px #5E5E5E;
      position: fixed;
      top: 0;
      z-index: 2;
    }
  }
```

&emsp;&emsp;参考资料：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" target="_black">Element.getBoundingClientRect()</a>
