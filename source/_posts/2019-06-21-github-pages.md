---
title: 使用 GitHub Pages 部署静态网页
urlname: github-pages
tags:
  - git
  - github
categories:
  - git
  - github
author: liuxy0551
copyright: true
date: 2019-06-21 13:44:22
updated: 2019-06-21 13:44:22
---


　　在日常工作中，偶尔会写一些自己的 demo，这些 demo 不需要部署到服务器上，但是需要快速部署来验证思路，而且要方便分享。主要是很多前端并没有服务器，这里记录一下我的方法：`GitHub Pages`
<!--more-->

>**GitHub Pages 的优点**
>* **使用零成本**：Github Pages 集成在 Github 中，直接和代码管理绑定在一起，随着代码更新自动重新部署，使用非常方便；
>* **免费域名**：免费提供 `username.github.io` 的域名，免费的静态网站服务器；
>* **无数量限制**：Github Pages 没有使用的数量限制，每一个 repository 都可以部署为一个静态网站；


> 这里介绍一下基于前端框架创建的项目如何部署到 GitHub Pages，这里我拿 Vue 的 webpack 项目举例，包含 vue-cli 2.x 和 vue-cli 3.x。

### 一、 vue-cli 2.x 下使用 GitHub Pages

　　1、创建项目
　　这里我是拿以前的 2.x 项目来测试部署的，想自行创建新项目的话可以参考 [https://github.com/vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)  

　　2、在 github 上创建一个新的 repository
　　将本地项目传到 github 上可参考我的另一篇随笔 [Git 常用命令（一）—— 将本地仓库与多个远程仓库关联](https://liuxianyu.cn/article/git-order-a.html)

　　来看一下项目结构：![](https://images-hosting.liuxianyu.cn/posts/github-pages/1.png)

　　这里需要配置的就是 /config/index.js，其中我们需要关注的是 module.exports 的 build 属性，我们将在这里配置 webpack build 时生成文件的路径。

　　``` 
    module.exports = {
      dev: {
        ...
      },
      build: {
        // Template for index.html
        index: path.resolve(__dirname, '../docs/index.html'),
    
        // Paths
        assetsRoot: path.resolve(__dirname, '../docs'),
        assetsSubDirectory: '',
        assetsPublicPath: '/huobi-trade-admin/',
        ...
      }
    }
    ```
    
　　这里将打包后的 dist 文件夹改名为 docs，不要把 docs 加入到`.gitignore`。


### 二、 vue-cli 3.x 下使用 GitHub Pages

　　这里我新建了一个基于 vue-cli 3.x 的项目，可以先看看 vue-cli 3.x 给的文档 [https://cli.vuejs.org/zh/guide/deployment.html#github-pages](https://cli.vuejs.org/zh/guide/deployment.html#github-pages)
主要设置两个参数：`publicPath`和`outputDir`，其余参数设置可以参考 [vue-cli 3.x 中的 vue.config.js](https://cli.vuejs.org/zh/config/#vue-config-js)。

　　``` 
    module.exports = {
      ...
      devServer: {
        host: '0.0.0.0',
        port: '8080',
        disableHostCheck: true,   // 解决 127.0.0.1 指向其他域名时出现"Invalid Host header"问题
      },
      publicPath: process.env.NODE_ENV === 'production' ? '/new-school-recruit/' : '/',
      outputDir: 'docs',
      ...
    }
    ```

我部署了一个基于 vue-cli 3.x 的项目 [https://liuxy0556.github.io/new-school-recruit](https://liuxy0556.github.io/new-school-recruit)，存储库为 [https://github.com/liuxy0556/new-school-recruit](https://github.com/liuxy0556/new-school-recruit)


>**注意**
>* **如果项目中有请求，请使用 https**

> 如果线上没有 `docs` 这个文件夹，在 Setting -> Github Pages -> Source 中是无法选择 master branch / docs folder 的，这个时候可以把 dist 文件夹下的文件放到项目根目录，然后在 Setting -> Github Pages -> Source 中选择第一项 master branch，点击给出的 url 就可以查看静态页面了。不推荐，因为每次打包都需要移动文件，或者 dist/index.html 会和根目录的 index.html 冲突。

**`npm run build`打包后然后把整个项目上传到 github 上之后就可以在存储库的 Setting，找到 GitHub Pages 部分，将 Source 选择为 master branch / docs folder （第二项），选择后会自动保存，然后在 Github Pages 部分就会给出 url ，点击即可进入我们的静态页面啦。**

![](https://images-hosting.liuxianyu.cn/posts/github-pages/2.png)
    

### 三、 自定义 template

　　在 Vue + Element UI 的技术栈下，有个我觉得很好用的后台管理系统模板 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)，我尝试将这两个项目通过 GitHub Pages 练习部署。
[vue-element-admin](https://liuxy0556.github.io/vue-element-admin)、[vue-admin-template](https://liuxy0556.github.io/vue-admin-template)
