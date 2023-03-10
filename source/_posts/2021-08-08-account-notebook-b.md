---
title: 账号簿开发（二）—— 微信小程序检查更新及调试
urlname: account-notebook-b
tags:
  - 微信小程序
categories:
  - 前端
  - 微信小程序
author: liuxy0551
copyright: true
date: 2021-08-08 17:13:03
updated: 2021-08-08 17:13:03
---


&emsp;&emsp;微信小程序发布上线后，对其进行迭代也需要微信官方审核代码，之后才可以发布新版本，对于已经使用过该小程序的用户来说，会因为缓存的关系，在小程序发布后不能及时更新到新版本。对于某些 bug 修复的版本，开发者总是希望能立即生效的，类似于 H5 的热更新，这时可以使用到微信提供的 `wx.getUpdateManager()`。官方文档：<a href="https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.getUpdateManager.html" target="_black">wx.getUpdateManager()</a>

<!--more-->


&emsp;&emsp;这是一个系列随笔，主要记录『账号簿』微信小程序的开发过程：
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook.html" target="_black">账号簿（微信小程序）的开发过程</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-a.html" target="_black">账号簿开发（一）—— 微信小程序 AES 加密解密</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-b.html" target="_black">账号簿开发（二）—— 微信小程序检查更新及调试</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-c.html" target="_black">账号簿开发（三）—— 微信小程序的云开发</a>  
&emsp;&emsp;<a href="https://liuxianyu.cn/article/account-notebook-d.html" target="_black">账号簿开发（四）—— 写一个随机密码生成器</a>  


### 一、代码封装

&emsp;&emsp;可以新建目录 `/src/utils/wechat`，在 wechat 目录下新建文件 `update.js`，代码如下：

``` javascript
// 检测小程序更新
const getUpdateInfo = () => {
  if (!wx.canIUse('getUpdateManager')) return
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(res => {
    if (res.hasUpdate) {
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好了，是否立即重启小程序？',
          success: ({ confirm }) => {
            // 新版本已经下载好，调用 applyUpdate 应用新版本并重启
            confirm && updateManager.applyUpdate()
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        })
      })
    }
  })
}

export {
  getUpdateInfo
}
```


### 二、使用

&emsp;&emsp;可以在小程序入口文件 `app.js` 中的 onLoad 方法中使用封装的 getUpdateInfo 方法。

``` javascript
import { getUpdateInfo } from '@/utils/wechat/update'

onLoad() {
  getUpdateInfo()
}
```


### 三、微信开发者工具调试

>**注意**
>**小程序 开发版/体验版 没有「版本」概念，所以无法在 开发版/体验版 上测试版本更新情况**

&emsp;&emsp;勾选`编译模式`下的`下次编译模拟更新`，并选择成功状态或失败状态，确认后点击`编译`按钮稍候片刻即可查看模拟效果：

![](https://images-hosting.liuxianyu.cn/posts/account-notebook/4.png)
![](https://images-hosting.liuxianyu.cn/posts/account-notebook/5.png)


