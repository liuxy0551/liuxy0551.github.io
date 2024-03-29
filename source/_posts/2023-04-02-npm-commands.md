---
title: npm 包相关命令
urlname: npm-commands
tags:
    - npm
categories:
    - npm
author: liuxy0551
copyright: true
date: 2023-04-02 18:43:56
updated: 2023-04-02 18:43:56
---

&emsp;&emsp;整理下 `npm` 包相关的一些命令，主要包括 `npm`、`yarn`、`pnpm`。

<!--more-->

### 一、npm

#### npm publish

&emsp;&emsp;可以通过 `nrm`` 管理源，方便切换。

```shell
npm config set registry https://registry.npmjs.org
```

```shell
npm whoami
```

```shell
npm login
```

&emsp;&emsp;npm 包可以带上 tag 标识

```shell
npm publish
```

```shell
npm publish --tag=beta
```

&emsp;&emsp;npm 包切换 tag

```shell
npm dist-tag add my-package-demo@1.0.0 latest
```

&emsp;&emsp;npm 撤销某个包

```shell
npm unpublish my-package-demo -f
```

#### npm link

&emsp;&emsp;被依赖的包

```shell
npm link
```

&emsp;&emsp;使用依赖的包

```shell
npm link my-package-demo
```

&emsp;&emsp;去除依赖

```shell
npm unlink
```

&emsp;&emsp;发布后的包可以同步到淘宝源，建议页面上点击 `进行同步` 按钮：`https://npmmirror.com/package/my-package-demo`

### yarn

&emsp;&emsp;待补充

### pnpm

#### pnpm link

&emsp;&emsp;被依赖的包

```shell
pnpm link --global
```

&emsp;&emsp;使用依赖的包

```shell
pnpm link --global my-package-demo
```

&emsp;&emsp;去除依赖

```shell
pnpm unlink
```

[官方文档](https://pnpm.io/zh/cli/link)

> **注意**
> 　　如果使用的是 clashx pro，出现连接不上 npm 官方源时可以打开增强模式，如果本地联调中，记得开关增强模式前后重启联调服务
