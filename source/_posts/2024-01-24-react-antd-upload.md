---
title: React 中使用 AntD Upload 组件时手动触发文件选择框
urlname: react-antd-upload
tags:
  - antd
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2024-01-24 15:58:58
updated: 2024-01-24 15:58:58
---

&emsp;&emsp;最近有个需求，需要在点击上传按钮时先调用接口判断是否满足上传的条件，而不是在上传后校验失败后进行报错，将校验前置。过程中没查到其他有用的资料，这里记录下。

<!--more-->

### 一、实现效果

![](https://images-hosting.liuxianyu.cn/posts/react-antd-upload/1.gif)

### 二、实现代码

#### html

&emsp;&emsp;先将 `Upload` 组件的 `openFileDialogOnClick` 属性置为 false，点击不打开文件对话框；`Upload` 的父级 div 加上 ref。

``` Html
<div ref={(el: any) => (this.uploadEle = el)}>
  <Upload {...upLoadProps} openFileDialogOnClick={false}>
      <Button
          type="primary"
          loading={loading}
          onClick={this.handleImport}
      >
          导入文件
      </Button>
  </Upload>
</div>
```

#### JavaScript

&emsp;&emsp;点击按钮，先进行接口校验，校验成功则弹出文件选择框，失败则弹提示。通过父级 div 去拿文件上传 input 的 dom，然后手动触发 `click` 事件。

``` ts
handleImport = () => {
    this.setState({ loading: true });
    API.checkImport().then(({ data }) => {
        if (data) {
            (this.uploadEle as any)?.querySelector('input[type=file]')?.click?.();
        } else {
            message.warning('校验失败');
        }
    }).finally(() => {
        this.setState({ loading: false }
    });
};
```
