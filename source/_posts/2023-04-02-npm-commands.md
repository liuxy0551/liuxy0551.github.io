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

&emsp;&emsp;当发布私有包（如 `@liuxy0551/dt-sql-parser`）时，npm 会要求付费，报错：`You must sign up for private package`，此时需要带上 `--access public` 标识

```shell
npm publish --tag=beta --access public
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

#### pnpm pack

&emsp;&emsp;当你本地开发一个 npm 包需要验证效果时，在开发的 npm 包路径下执行 `pnpm pack` 命令，会生成一个 tgz 的压缩文件，这和 npm publish 发布的包内容相同，使用下方的命令安装，`-w` 是 workspace 的标识，可以忽略，安装前最好删除 node_modules。

```shell
pnpm pack
```

```shell
pnpm install /Users/liuyi/Desktop/Projects/dtstack/my-package-demo/my-package-demo-0.0.1-beta.0.tgz -w
```

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
