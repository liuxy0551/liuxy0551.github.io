---
title: 记账啦开发系列（二）—— 微信小程序
urlname: jizhangla-api-b
tags:
  - 微信小程序
  - 记账啦
  - node
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2021-02-21 22:30:29
updated: 2021-02-21 22:30:29
---

&emsp;&emsp;`记账啦`是一个微信小程序，**如果你也喜欢记账，可以看看这个小程序。**

<!--more-->


### 系列文章

&emsp;&emsp;<a href="https://liuxianyu.cn/article/jizhangla-api-a.html" target="_black">记账啦开发系列（一）—— 项目介绍</a>
&emsp;&emsp;<a href="https://liuxianyu.cn/article/jizhangla-api-b.html" target="_black">记账啦开发系列（二）—— 微信小程序</a>


### 截图展示

{% gp 9-9 %}
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/1.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/2.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/3.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/4.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/5.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/6.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/7.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/8.jpg)
    ![](https://liuxianyu.cn/image-hosting/posts/jizhangla-api-b/9.jpg)
{% endgp %}


### 目录结构

&emsp;&emsp;微信小程序使用的框架是 wepy 2.x 版本，可参考另一篇随笔：<a href="https://liuxianyu.cn/article/wepy-command.html" target="_black">wepy 常用指令</a>。

```
jizhangla-wechat
├─.editorconfig
├─.prettierrc
├─.wepycache
├─.wepyignore
├─package.json
├─project.config.json
├─wepy.config.js
├─src
|  ├─app.wpy
|  ├─utils
|  |   ├─date.js
|  |   ├─index.js
|  |   ├─previewImage.js
|  |   ├─toast.js
|  |   ├─data
|  |   |  └accountTypes.js
|  |   ├─api
|  |   |  ├─apis.js
|  |   |  └request.js
|  ├─store
|  |   ├─index.js
|  |   ├─modules
|  |   |    ├─accountBook.js
|  |   |    ├─accountType.js
|  |   |    ├─asset.js
|  |   |    ├─member.js
|  |   |    └user.js
|  ├─pages
|  |   ├─personal
|  |   |    ├─about.wpy
|  |   |    ├─accountBook.wpy
|  |   |    ├─appSetting.wpy
|  |   |    ├─feedback.wpy
|  |   |    ├─index.wpy
|  |   |    ├─info.wpy
|  |   |    ├─userIntegral.wpy
|  |   |    ├─member
|  |   |    |   ├─form.wpy
|  |   |    |   └index.wpy
|  |   |    ├─asset
|  |   |    |   ├─form.wpy
|  |   |    |   ├─index.wpy
|  |   |    |   └types.wpy
|  |   ├─login
|  |   |   ├─index.wpy
|  |   |   ├─protocol.wpy
|  |   |   └welcome.wpy
|  |   ├─home
|  |   |  └index.wpy
|  |   ├─billTemplate
|  |   |      └index.wpy
|  |   ├─bill
|  |   |  ├─form.wpy
|  |   |  └index.wpy
|  |   ├─asset
|  |   |   └index.wpy
|  ├─components
|  |   ├─share
|  |   |   ├─BillDayItem.wpy
|  |   |   └ToLogin.wpy
|  ├─mixins
|  |   ├─mixList.js
|  |   └mixScrollView.js
├─static
|   ├─styles
|   |   ├─color.less
|   |   ├─default.less
|   |   ├─index.less
|   |   ├─myCss.less
|   |   └vant.less
|   ├─images
|   |   ├─home-top.jpg
|   |   ├─logo.png
|   |   ├─more-icon.png
|   |   ├─share.jpg
|   |   ├─tabBar
|   |   |   ├─asset_active.png
|   |   |   ├─asset_inactive.png
|   |   |   ├─bill_active.png
|   |   |   ├─bill_inactive.png
|   |   |   ├─home_active.png
|   |   |   ├─home_inactive.png
|   |   |   ├─personal_active.png
|   |   |   └personal_inactive.png
```

#### mixList.js

&emsp;&emsp;这里着重记录下 mixins 混入的写法，可以节省喝多长列表页面的代码量，我在 H5 的开发中也经常使用这种写法，可参考我写的组件文档：<a href="http://ui.syedu.tech/show-component/scroll" target="_black">syedu -> Scroll 滚动</a>。

``` javascript
/*
 * 列表页请求数据 - mixList
 */
export default {
  data: {
    mixPromise: null,
    mixParams: null,
    mixData: {
      fetching: false,
      items: [],
      page: 1,
      pageSize: 10,
      total: 0
    },
    extraCallBack: null, // 额外的数据处理
    itemsRealLength: 0 // 当前整理过后的数组实际长度
  },
  methods: {
    // 分页
    async mixFetchPageData (promise, query = {}) {
      this.mixPromise = promise || this.mixPromise
      this.mixParams = { ...this.mixParams, page: this.mixData.page, pageSize: this.mixData.pageSize, ...query }
      this.mixData.fetching = true

      return await this.mixPromise(this.mixParams).then(res => {
        this.mixData.fetching = false
        return res
      }).catch(() => {
        this.mixData.fetching = false
      })
    },

    // 获取数据，如果结果是 res.data[data]，则可以传入 data，一般用不着
    async mixFetchData (promise, query = {}, hasMore = false, data = '') {
      if (!hasMore) {
        this.mixData.page = 1
      } else {
        this.mixData.page += 1
      }
      let res = await this.mixFetchPageData(promise, query)
      if (hasMore) {
        this.mixData.items = this.mixData.items.concat(data ? res.data[data] : res.data)
      } else {
        this.mixData.items = data ? res.data[data] : res.data
      }
      this.extraCallBack && this.extraCallBack()
      this.mixData.total = res.total
    },

    // 上拉加载更多
    async mixLoadMore (data = '') {
      if (this.mixData.total > (this.itemsRealLength ? this.itemsRealLength : this.mixData.items.length) && this.mixPromise) {
        await this.mixFetchData(this.mixPromise, { ...this.mixParams, page: this.mixData.page + 1, pageSize: this.mixData.pageSize }, true, data)
      }
    }
  }
}


// used

// mixData.items 数据集合（数组），在页面中循环展示

// methods: {
//   fetchData () {
//     this.mixFetchData(wepy.apis.getUsers)
//   }
// }

// 上拉加载更多
// onReachBottom () {
//   this.mixLoadMore()
// }
```

>**注意**
> **ios 微信小程序中的 Promise 不支持使用 finally，请使用 .then 和 catch**
