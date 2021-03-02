---
title: 钉钉定制工作台自定义组件开发
urlname: dingtalk-workbench-plugin
tags:
  - 钉钉
categories:
  - 前端
  - 钉钉
author: liuxy0551
copyright: true
date: 2021-03-02 18:22:43
updated: 2021-03-02 18:22:43
---

&emsp;&emsp;钉钉定制工作台的介绍可查阅官方文档 <a href="https://developers.dingtalk.com/document/dashboard" target="_black">什么是钉钉定制工作台</a>，这篇随笔主要涉及`开发自定义组件`，对使用官方组件的过程不做介绍。

<!--more-->


### 一、准备工作

#### 1、小程序开发者工具

&emsp;&emsp;下载最新版 <a href="https://developers.dingtalk.com/document/resourcedownload/miniapp-tool?pnamespace=dashboard" target="_black">小程序开发者工具</a>`重要`。

#### 2、查阅文档

&emsp;&emsp;其余步骤参考：<a href="https://developers.dingtalk.com/document/dashboard/dashboard-component-develop-overview" target="_black">开发自定义组件 - 入门教程</a>，这篇随笔不做赘述。


### 二、常见问题

#### 1、小程序语法

&emsp;&emsp;`自定义组件使用小程序语法`，可使用`block`、`picker`、`swiper`等标签。

#### 2、在自定义组件中使用数据源

&emsp;&emsp;先查阅官方文档：<a href="https://developers.dingtalk.com/document/dashboard/lw6y3w" target="_black">SDK -> 发送请求</a>
&emsp;&emsp;`/plugin/components/sy-swiper/index.js`：

```javascript
import { getSdk, getLifecycleSdk, } from '../../api/sdk';

Component({
  data: {
    bannerList: []
  },
  props: {
    ...
  },
  didMount() {
    ...
    this.getBanners()
  },
  ...
  methods: {
    // 获取轮播图列表
    async getBanners () {
      // 这里读到的props，和config.json文件中定义的props相对应，详见config.json文件说明
      const props = this.props.componentProps;

      // 请求接口 - 获取新闻列表
      const { data } = await getSdk().request(props.getBanners, {}, {
        // sdk.request的第三个参数，输入注册数据源的信息
        url: 'http://xxxxxxx.com/api/v1/xxxx',
        apiKey: 'XXXXXX_BANNERS',
        httpMethod: 'GET',
        params: '',
        apiSecret: 'XXXXXX_BANNERS',
        system: {
          userid: 'xxxx',
          corpId: 'xxxx'
        }
      })
      this.setData({ bannerList: data.groupnews.filter(i => i.topimg) })
    }
  }
});
```

&emsp;&emsp;`/plugin/components/sy-swiper/index.axml`：

```
<!-- 轮播图列表 -->
<view class="sy-swiper-box">
  <swiper class="swiper-box" 
    indicator-dots="{{ true }}"
    autoplay="{{ true }}"
    interval="{{ 5000 }}"
    circular="{{ true }}"
  >
    <swiper-item a:for="{{ bannerList }}" key="swiper-item-{{ index }}">
      <image class="swiper-img" mode="scaleToFill" src="{{ item.topimg }}" data-index="{{ index }}" onTap="goPage" />
    </swiper-item>
  </swiper>
</view>
```

#### 3、打开应用或链接

&emsp;&emsp;阅读官方文档：<a href="https://developers.dingtalk.com/document/dashboard/qlmb8y" target="_black">SDK -> 打开应用或链接</a>
