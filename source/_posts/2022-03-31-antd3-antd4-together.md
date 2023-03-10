---
title: React 项目中同时引入 antd3.x 和 antd4.x
urlname: antd3-antd4-together
tags:
  - AntD
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2022-02-13 11:33:16
updated: 2022-03-31 16:23:02
---


&emsp;&emsp;公司的项目中一直使用的是`antd3.x`，最近有个需求，`TreeSelect`支持多选和模糊搜索的时候，模糊搜索后选中某个选项，不清除搜索条件，点击组件外其他地方才清除搜索条件。思路是如下：

- 设置 autoClearSearchValue 为 false，选择选项后不清除搜索框
- 监听 onBlur 事件，触发时清除搜索框

<!--more-->



### 一、使用 antd3.x

&emsp;&emsp;由于年久失修，antd3.x 有很多 api 有错误，会影响业务场景，这里就有一个坑：

&emsp;&emsp;`antd3.x TreeSelect`，在第一次获得焦点时，会依次触发`onFocus`、`onBlur`、`onFocus`，此时会清除一下搜索框，第一次还没有输入搜索条件，清除也无伤大雅。

![](https://liuxianyu.cn/image-hosting/posts/antd3-antd4-together/1.gif)

&emsp;&emsp;输入搜索内容后，选择某个选项，此时会发现，第一次选择选项，会再次出触发`onBlur`事件，这就让人很尴尬了，这样会让开发者无法区分`onBlur`到底是搜索后第一次选择选项触发的，还是点击组件外触发的，也就不能在`onBlur`事件中清除搜索条件，否则与需求不符。

![](https://liuxianyu.cn/image-hosting/posts/antd3-antd4-together/2.gif)


> **思考**
> 我们去`antd4.x TreeSelect`尝试了一下，发现没有这个问题，所以着手引入 antd4.x；
> 但是项目中目前暂时不能全部升级 antd4.x，否则改动太大；
> 最终考虑同时引入 antd3.x 和 antd4.x。



### 二、使用 antd4.x

#### 2.1、安装

``` bash
yarn add antd-v4@npm:antd@^4
```

&emsp;&emsp;安装完成后可以在 package.json 和 yarn.lock 中看到安装的依赖：

{% gp 4-4 %}
![](https://liuxianyu.cn/image-hosting/posts/antd3-antd4-together/3.png)
![](https://liuxianyu.cn/image-hosting/posts/antd3-antd4-together/4.png)
{% endgp %}


#### 2.2、配置 css loader

``` javascript
const path = require('path');

module: {
  rules: [
    {
      test: /\.less$/,
      include: [
        path.resolve(__dirname, "../../node_modules/antd-v4"),
      ],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': 'ant-v4',
              '@primary-color': '#237804', // 主题色
            }
          }
        }
      ]
    }
  ]
},
```

- `style-loader`将打包后的 css 代码添加到页面头部
- `css-loader`加载 css 文件，`importLoaders`的含义可参考：<a href="https://zhuanlan.zhihu.com/p/94706976" target="_black">css-loader中importLoaders的理解</a>
- `less-loader`将 less 转成 css，`modifyVars`可以修改 less 中变量的值，我们再配合 antd4.x ConfigProvider 的 prefixCls 属性，搭配 ant-prefix 将样式前缀修改为`antd-v4`，故意修改下主题色，可以更显眼的看到是否成功

&emsp;&emsp;如果已经配置了 less loader，建议给之前的规则添加 exclude：

``` javascript
exclude: [
  path.resolve(__dirname, "../../node_modules/antd-v4"),
],
```

>**注意**
> `path.resolve` 处理的是 node_modules 中的 antd-v4，注意路径
> 修改 webpack 配置后需要重启项目


#### 2.3、引入样式、组件

&emsp;&emsp;在`/src/components`下新建一个文件夹 `TreeSelectV4`，添加 index.tsx：

``` typescript
/**
 * 封装 antd4.x 的 TreeSelect
 * 使用的地方可以直接使用 TreeSelectV4，不再需要引入各种 antd4.x 的依赖
 */
import * as React from 'react'
import { ConfigProvider, TreeSelect } from 'antd-v4';
import zhCN from 'antd-v4/es/locale/zh_CN';
import 'antd-v4/dist/antd.less';
// import './style.scss'

export default class TreeSelectV4 extends React.Component<any, any> {
  render () {
    return (
      <ConfigProvider locale={zhCN} prefixCls="ant-v4">
        <TreeSelect {...this.props} />
      </ConfigProvider>
    )
  }
}
```

- prefixCls 是样式前缀，这里统一写成`ant-v4`。

![](https://liuxianyu.cn/image-hosting/posts/antd3-antd4-together/5.gif)


> **注意**
> 建议完成以上内容后执行 lint、check-types、test 等命令
> 建议升级`typescript`等相关依赖的版本


### 参考资料

1、<a href='https://3x.ant.design/components/tree-select-cn/' target='_black'>antd3.x 的 TreeSelect</a>   
2、<a href='https://ant.design/components/tree-select-cn/' target='_black'>antd4.x 的 TreeSelect</a>   
