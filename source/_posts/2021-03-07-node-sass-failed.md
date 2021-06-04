---
title: node-sass 安装失败，使用 dart-sass 替代
urlname: node-sass-failed
tags:
  - Vue
categories:
  - 前端
  - Vue
  - Sass
author: liuxy0551
copyright: true
date: 2021-03-07 20:04:59
updated: 2021-03-07 20:04:59
---

&emsp;&emsp;项目中使用的`node-sass`在服务器上经常安装失败，改用`dart-sass`替代，记录下更换方法。

<!--more-->



#### 更换方法

```
npm uninstall node-sass
npm i sass -D
```

>**注意**
>* **dart-sass 不支持 sass 的`/deep/`的写法，需要更换成：`::v-deep`**

&emsp;&emsp;示例：

```scss
.box {
  /deep/ .van-button {
    padding: 0 20px;
  }
}

// 修改为：
.box {
  ::v-deep .van-button {
    padding: 0 20px;
  }
}
```


#### 参考资料：

&emsp;&emsp;<a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/sass.html#node-sass-to-dart-sass" target="_black">Node Sass to Dart Sass —— vue-element-admin</a>
