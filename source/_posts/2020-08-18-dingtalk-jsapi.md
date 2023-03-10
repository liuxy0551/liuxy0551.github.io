---
title: 基于钉钉 JSAPI 封装 DingTalk 类
urlname: dingtalk-jsapi
tags:
  - 钉钉
categories:
  - 前端
  - 钉钉
author: liuxy0551
copyright: true
date: 2020-08-18 10:35:32
updated: 2020-08-18 10:35:32
---

&emsp;&emsp;钉钉 JSAPI 为 H5 微应用开发提供了调用钉钉控件的能力，这里记录一下自己封装的 DingTalk 类，方便开发。可参考 <a href="https://developers.dingtalk.com/document/app/jsapi-overview" target="_black">钉钉开发文档</a>

<!--more-->


### 一、钉钉 JSAPI

&emsp;&emsp;封装的 DingTalk 类也是基于钉钉 JSAPI，所以项目中需要安装钉钉的 JSAPI：

#### 1、npm
```
npm i dingtalk-jsapi -S
```

#### 2、CDN 引入

&emsp;&emsp;详见 <a href="https://liuxianyu.cn/article/vue-cli3-cdn.html" target="_black">前端项目优化之旅（六）—— 引入并使用 CDN</a>



### 二、DingTalk 类

#### 1、封装

&emsp;&emsp;新建`/src/utils/DingTalk/index.js`，内容如下：

``` javascript
import * as dd from 'dingtalk-jsapi'
import Vue from 'vue'
import store from '@/store'

class DingTalk {
  // dd.ready
  static ready () {
    return new Promise(resolve => {
      dd.ready(() => {
        resolve()
      })
    })
  }

  // 钉钉 JSAPI 鉴权
  static async getJsApiTicket () {
    let params = {
      corpId: store.state.user.corpId,
      url: location.origin + '/'
    }
    const jsApiList = [ // 必填，需要使用的jsapi列表，注意：不要带dd。
      'biz.contact.complexPicker'
    ]

    return new Promise((resolve, reject) => {
      Vue.prototype.axios.post(`${ process.env.VUE_APP_BASE_API || '' }/api/getJsApiTicket`, params).then(res => {
        if (res.data.code === 200) {
          let config = {
            agentId: res.data.data.agentId,
            corpId: res.data.data.corpId,
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: jsApiList
          }
          dd.config(config)
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 获取 authCode
  static async requestAuthCode (corpId) {
    return new Promise(async (resolve, reject) => {
      await DingTalk.ready()
      dd.runtime.permission.requestAuthCode({
        corpId,
        onSuccess: res => {
          resolve(res)
        },
        onFail: err => {
          console.log('error: ' + JSON.stringify(err))
          reject(err)
        }
      })
    })
  }

  // 通讯录选人 - 选人和选部门
  static async complexPicker (options = {}) {
    return new Promise(async (resolve, reject) => {
      await DingTalk.ready()
      dd.biz.contact.complexPicker({
        title: options.title || '请选择',  // 标题
        corpId: options.corpId || store.state.user.corpId,  // 企业 id，corpId 必须是用户所属的企业的 corpId
        multiple: options.multiple || false,  // 是否多选
        maxUsers: options.maxUsers || 1,  // 人数限制，当 multiple 为 true 才生效，可选范围 1-1500
        limitTips: options.limitTips || '仅需选择一个审批人',  // 超出选人的人数限制之后的提示
        pickedUsers: options.pickedUsers || [], // 已选用户
        pickedDepartments: options.pickedDepartments || [], // 已选部门
        disabledUsers: options.disabledUsers || [], // 不可选用户
        disabledDepartments: options.disabledDepartments || [], // 不可选部门
        requiredUsers: options.requiredUsers || [], // 必选用户（不可取消选中状态）
        requiredDepartments: options.requiredDepartments || [], // 必选部门（不可取消选中状态）
        appId: options.appId, // 微应用的Id
        permissionType: options.permissionType || 'GLOBAL',  // 选人权限，目前只有GLOBAL这个参数，非必填
        responseUserOnly: options.responseUserOnly || true,  // true: 返回人员信息 false: 返回人员和部门信息
        startWithDepartmentId: options.startWithDepartmentId || 0, // 0: 表示从企业最上层开始 -1: 表示从自己所在部门开始
        onSuccess: res => {
          resolve(res)
        },
        onFail: err => {
          console.log('error: ' + JSON.stringify(err))
          reject(err)
        }
      })
    })
  }

  static install (Vue) {
    Vue.prototype.isDingTalk = dd?.env?.platform !== 'notInDingTalk'
    Vue.prototype.DingTalk = DingTalk
  }

  constructor () {
  }
}

export default DingTalk
```



#### 2、引入

&emsp;&emsp;在`/src/utils/index.js`中添加如下引入：

```javascript
import DingTalk from './DingTalk'

export default {
  install (Vue) {
    Vue.use(DingTalk)
  }
}
```


#### 3、使用
``` javascript
methods: {
  // 获取 authCode
  async getAuthCode () {
    let res = await this.DingTalk.requestAuthCode(this.corpId)
  }
}

或

mounted () {
  this.DingTalk.getJsApiTicket() // 钉钉鉴权
}
```

#### 4、判断是否是钉钉环境

```
import * as dd from 'dingtalk-jsapi'
...
console.log(dd.env.platform === 'notInDingTalk')
```
