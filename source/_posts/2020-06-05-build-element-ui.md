---
title: 通过 CDN 引入 element-ui 时，如何改变其主题色
urlname: build-element-ui
tags:
  - Element UI
  - CDN
categories:
  - 前端
  - Vue
  - CDN
author: liuxy0551
copyright: true
date: 2020-06-05 19:03:48
updated: 2020-06-05 20:04:37
---

&emsp;&emsp;最近公司有个项目，使用了 element-ui，而且使用了自己项目的主题色 —— 橙色。
&emsp;&emsp;按照 <a href="https://element.eleme.cn/#/zh-CN/component/custom-theme#zai-xiang-mu-zhong-gai-bian-scss-bian-liang" target="_blank">Element UI -> 自定义主题 -> 在项目中改变 SCSS 变量</a> 中的设置就可以把项目中的 element-ui 的主题色改为橙色了。

<!--more-->


&emsp;&emsp;然而，在我根据 <a href="https://liuxianyu.cn/article/vue-cli3-cdn.html" target="_black">前端项目优化之旅（六）—— 引入并使用 CDN</a> 优化项目的时候，通过 CDN 引入 element-ui 的 js 和 css 文件(`/element-ui/lib/theme-chalk/index.css`)，这个时候问题就来了，项目的主题色全变为默认的蓝色了，吓死人了。赶紧来解决吧：


### 一、第一次尝试

&emsp;&emsp;element-ui 的 css 文件是经过编译的，`$--color-primary`早已被编译成了蓝色(#409EFF)，那就全局替换吧，替换成我的橙色，上传 OSS，一气呵成。
&emsp;&emsp;一刷新，咦，怎么按钮边线有股淡淡的蓝色，到其他页面一看，事情并不简单，一片淡蓝色，想起主题色带透明的颜色都没有进行替换。如果替换的话，还得挨个计算加上透明度后色号是多少再替换，还可能遗漏，而且很显然，这不是程序员干的事儿。那么，第二种解法来了：


### 二、第二次尝试 `正解`

&emsp;&emsp;好嘛，你是经过编译的嘛，来，编译你。拉取 <a href="https://github.com/ElemeFE/element" target="_black">element-ui</a> 源码(master 分支)。拿到一个项目，如何直击灵魂呢，查看`package.json`即可，还别说，大厂就是大厂，代码写得让人很舒服。

![](https://liuxianyu.cn/image-hosting/posts/build-element-ui/1.png)

&emsp;&emsp;可以看到，script 中的`build:theme`就是我们想要的命令，命令行先走一个试一下：
```shell
npm run build:theme
```
&emsp;&emsp;报错了，仔细一看，sass-loader 要求 node 版本为 11.x 了，那当前的 13.x 咋办呢，学一下 <a href="https://liuxianyu.cn/article/node-n.html" target="_blank">Mac OS 中管理 node 版本的工具 —— n</a> 吧。

![](https://liuxianyu.cn/image-hosting/posts/build-element-ui/2.png)

&emsp;&emsp;整好环境后，再来一次吧，结果还凑合。

![](https://liuxianyu.cn/image-hosting/posts/build-element-ui/3.png)

&emsp;&emsp;那找到 element-ui 设置的`$--color-primary`改为我的橙色再编译一下，不就可以了嘛，机智，说干就干。全局搜索`$--color-primary`，发现 element-ui 是在`/element-ui/packages/theme-chalk/src/common/var.scss`中设置主题色的，找到`$--color-primary`，将色号从默认的`#409EFF`改为橙色就可以了，连带着透明度的颜色变量都会在编译后改变，SASS 的美妙。

&emsp;&emsp;这个时候再`npm run build:theme`一次，上传`/element-ui/lib/theme-chalk/index.css`到 OSS，再次刷新，就是特别好看的橙色啦!



### 三、新遇到的问题

&emsp;&emsp;最近再次编译的时候发现会报如下错误：意思是`postcss`版本高了，引用需要修改，将`/packages/theme-thalk/gulpfile.js`中的`browsers`改为`overrideBrowserslist`再次编译即可。
![](https://liuxianyu.cn/image-hosting/posts/build-element-ui/4.png)


### 四、类似随笔

<a href="https://liuxianyu.cn/article/element-cdn-global-settings.html" target="_black">通过 CDN 引入 element-ui 时，如何改变其全局配置 (size, z-index)</a>
