---
title: form 表单通过正则表达式校验联系方式
urlname: telephone-mobile-check
tags:
  - 正则表达式
categories:
  - 前端
  - 正则表达式
author: liuxy0551
copyright: true
date: 2019-09-16 16:02:15
updated: 2019-09-16 16:02:15
---


　　最近公司项目中有个表单提交时需要校验输入的联系方式是电话号码或者手机号，通过正则表达式校验，记录一下。
<!--more-->


### 一、HTML

``` html
<el-form :model="form" ref="formRef">
  <el-form-item prop="phone" :rules="[$validators.checkTelephone()]">
    <el-input placeholder="请输入联系方式" v-model="form.phone"></el-input>
  </el-form-item>
</el-form>

```

### 二、正则表达式

``` javascript
  // 联系方式校验 电话和手机号
  checkTelephone(options) {
    // 联系方式校验 电话和手机号
    function checkTelephone(rule, value, callback) {
      if (!value) {
        callback('联系方式不能为空'); // 校验不通过
        return false
      } else {
        const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
        const isPhone01 = /^([0-9]{3,4})?[0-9]{7,8}$/; // 0571-86295197
        const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
        // const isPhone02 = /^[0-9]{3,4}-[0-9]{2,3}-[0-9]{2,3}$/; // 4001-550-520
        // const isPhone02 = /^([0-9]{3,4}-)?([0-9]{3,4}-)?[0-9]{3,4}$/; // 4001-550-520
        const isMob=/^1[0-9]{10}$/;
        // const phone02 = /^0\d{2,3}-?\d{7,8}$/;
        const valuePhone = value.trim();
        if (isMob.test(valuePhone) || isPhone.test(valuePhone) || isPhone01.test(valuePhone) || isPhone02.test(valuePhone)) { // 正则验证
          callback()     // 校验通过
          return true
        } else {
          callback('请输入正确的联系方式') // 校验不通过
          return false
        }
      }
    }
    return Object.assign({ validator: checkTelephone, message: '请输入正确的联系方式', trigger: 'blur' }, options)
  }
```


### 参考资料

1、[正则 （手机号，座机， 密码8-16位字母与数字校验）](https://blog.csdn.net/qq_37672347/article/details/93210354)
