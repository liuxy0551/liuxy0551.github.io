---
title: 通过 Lerna 创建自己的 eslint 配置包
urlname: my-eslint-config-by-lerna
tags:
  - eslint
  - Lerna
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2022-03-23 17:24:04
updated: 2022-03-23 17:24:04
---


&emsp;&emsp;最近在写一个`eslint config`的整合包，因为有不同语言，会发多个 npm 包，通过 <a href="https://github.com/lerna/lerna" target="_black">Lerna</a> 来管理多包发布，它优化了使用 git 和 npm 管理多包存储库的工作流，Vue、Babel、React 都有使用 Lerna。这里记录下使用过程中的一些点。

<!--more-->


### 一、两种工作模式

#### 1.1、固定模式

&emsp;&emsp;Fixed/Locked mode，Vue，Babel 都是用这种，在 publish 的时候，会依据`lerna.json`文件里面的`"version": "0.0.1"`进行增加，只选择一次，其他有改动的包自动更新版本号。

#### 1.2、独立模式

&emsp;&emsp;Independent mode，执行`lerna init --independent`命令初始化项目，`lerna.json`文件里面会设置`"version": "independent"`。每次 publish 时，会得到一个提示符，提示每个已更改的包，以指定是补丁、次要更改、主要更改还是自定义更改(`x.y.z`)。


### 二、初始化

&emsp;&emsp;新建一个文件夹`eslint-config-liuxy0551`，并进入该文件夹；为了方便 github action，安装 lerna 到开发环境：

``` bash
npm init -y
yarn add lerna -D
```

&emsp;&emsp;因为 lerna 经常需要用到，我们全局安装下：

``` bash
yarn global add lerna
```

&emsp;&emsp;安装完成后输入`lerna -v`查看版本号：

![](https://liuxianyu.cn/image-hosting/posts/my-eslint-config-by-lerna/1.png)

``` bash
lerna init
```

&emsp;&emsp;我们使用固定模式，然后进入`packages`文件夹初始化几个不同语言对应的 eslint config 包：

``` bash
cd packages
mkdir basic prettier typescript

cd basic
npm init -y
cd ../prettier
npm init -y
cd ../react
npm init -y
cd ../typescript
npm init -y
```

&emsp;&emsp;项目结构如下：

```
eslint-config-liuxy0551
├─lerna.json
├─package.json
├─result.txt
├─yarn.lock
├─packages
|    ├─typescript
|    |     └package.json
|    ├─react
|    |   └package.json
|    ├─prettier
|    |    └package.json
|    ├─basic
|    |   └package.json
```

&emsp;&emsp;按照约定 <a href="https://eslint.org/docs/developer-guide/shareable-configs" target="_black">Shareable Configs</a>，包名应该以`eslint-config-`开头，例如：`eslint-config-liuxy0551-basic`。依次将 packages 下的几个 package.json 中的 name 改成如：@liuxy0551/eslint-config-liuxy0551-basic，version 改成 0.0.0。

&emsp;&emsp;每个子 package 都有自己的 node_modules，通过如下设置，就可以只在根目录创建 node_modules，只有开启了 private 的项目才能使用 workspaces。依次修改根目录的 package.json 和 lerna.json，添加以下配置项：

``` json
"private": true,
"workspaces": [
  "packages/*"
]
```

``` json
"useWorkspaces": true,
"npmClient": "yarn"
```


### 三、绑定 git 和 npm

&emsp;&emsp;接下来与远程仓库绑定，并登录 npm：

``` bash
git remote add origin git@github.com:liuxy0551/eslint-config-liuxy0551.git
```

``` bash
npm whoami
```

> **注意**
> 如果上述命令报错，排查 npm 源: `npm config ls`
> 设置 npm 官方源: `npm config set registry https://registry.npmjs.org/`
> 如果未登录则执行`npm login`登录


### 四、配置内容

&emsp;&emsp;在 packages/basic 文件夹下新建 index.js，内容如下：

``` javascript
module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:eslint-comments/recommended',
    'plugin:yml/recommended',
    'prettier',
  ],
  plugins: ['html'],
  rules: {
    
  },
}
```

&emsp;&emsp;`rules`对象就是我们可以自己改动的配置项，在`Airbnb/JavaScript`仓库中的 <a href="https://github.com/airbnb/javascript/issues/1089" target="_black">https://github.com/airbnb/javascript/issues/1089</a>，告诉了我们有哪些规则可以被修改。


### 五、lerna 命令

#### 5.1、创建一个包

`lerna create <包名> [存放的目录]`

``` bash
lerna create packageName
```

#### 5.2、查看当前列表

``` bash
lerna list
```

![](https://liuxianyu.cn/image-hosting/posts/my-eslint-config-by-lerna/2.png)

#### 5.3、增加本地或者远程 package 作为当前项目 packages 里面的依赖

`lerna add [@version] [--scope=localPackageName] [-D] [--exact]`

- -D 表示安装到 devDependencies
- --exact 表示安装准确版本，不带 ^

> **注意**
> 以下基于`node 12`版本安装插件，需要兼容低版本的可以在插件后加上版本号

``` bash
lerna add eslint
```
``` bash
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-loader
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-config-airbnb
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-eslint-comments
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-html
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-import
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-node
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-promise
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-basic eslint-plugin-sort-requires
```

&emsp;&emsp;加上`--scope=`表示给本地指定的包安装依赖，也可以 cd 到这个包的文件夹下安装，就不用加`--scope=`了；不加则是给所有子包都安装该依赖。

``` bash
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-typescript @liuxy0551/eslint-config-liuxy0551-basic
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-typescript @typescript-eslint/eslint-plugin
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-typescript @typescript-eslint/parser
```

``` bash
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-react @liuxy0551/eslint-config-liuxy0551-typescript
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-react eslint-plugin-jest
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-react eslint-plugin-jsx-a11y
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-react eslint-plugin-react
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-react eslint-plugin-react-hooks
```

``` bash
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-prettier @liuxy0551/eslint-config-liuxy0551-react
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-prettier prettier
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-prettier prettier-plugin-jsdoc
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-prettier eslint-config-prettier
lerna add --scope=@liuxy0551/eslint-config-liuxy0551-prettier eslint-plugin-prettier
```

#### 5.4、安装依赖

&emsp;&emsp;因为我们指定过使用 yarn，直接执行`yarn install`就会把所有包的依赖安装到根目录的 node_modules。

``` bash
lerna bootstrap
```

#### 5.5、删除依赖

``` bash
lerna clean --scope=特定的某个包
```

&emsp;&emsp;和`rm -rf node_modules`功能一致，`--scope=`表示指定包，不会移除根目录的 node_modules。

#### 5.6、建立软链接

`lerna link [--force-local]`

``` bash
lerna link --force-local
```

&emsp;&emsp;类似`npm link`的使用，--force-local 表示不论本地的版本是否符合，都使用本地的版本。

#### 5.7、列出更新的包

``` bash
lerna changed
```

&emsp;&emsp;列出改动过的包，发布时只更新改动过的包。

![](https://liuxianyu.cn/image-hosting/posts/my-eslint-config-by-lerna/3.png)

#### 5.8、指定版本号

``` bash
lerna version 0.0.2 -y
```

&emsp;&emsp;需要本地分支和远程分支无差别。

#### 5.9、发布

`lerna publish [--conventional-commits -y]`

``` bash
lerna publish
```

&emsp;&emsp;需要先执行 git commit，会打 tag，`--conventional-commits`表示生成 changelog。如果包名是带 scope 的格式，如：@liuxy0551/eslint-config-liuxy0551，则需要在 package.json 中添加配置项，packages 下的每个包都需要加：

``` json
"publishConfig": {
  "access": "public"
}
```

{% gp 4-4 %}
![](https://liuxianyu.cn/image-hosting/posts/my-eslint-config-by-lerna/4.png)
![](https://liuxianyu.cn/image-hosting/posts/my-eslint-config-by-lerna/5.png)
{% endgp %}

### 六、发布整合包

> lerna publish 只会发布 packages 下的包，当前文件夹并不会作为一个包发布

&emsp;&emsp;在 packages 文件夹下新建一个`main`，作为入口：

``` bash
cd packages
mkdir main

cd main
npm init -y
```

&emsp;&emsp;将 main 下 package.json 中的 name 改成如：@liuxy0551/eslint-config-liuxy0551，version 改成 0.0.0。添加依赖：

``` bash
lerna add --scope=@liuxy0551/eslint-config-liuxy0551 eslint@^7.0.0
lerna add --scope=@liuxy0551/eslint-config-liuxy0551 @liuxy0551/eslint-config-liuxy0551-react
```

&emsp;&emsp;在 packages/main 文件夹下新建 index.js，内容如下：

``` javascript
/** Export all */
module.exports = {
  extends: [
    '@liuxy0551/eslint-config-liuxy0551-react',
  ]
}
```

&emsp;&emsp;lerna 不会发布标记私有的项目，需要修改根目录 package.json 中的配置`"private": false`

``` bash
npm whoami
```
``` bash
lerna publish
```

&emsp;&emsp;访问<a href="https://www.npmjs.com/search?q=@liuxy0551/eslint-config-liuxy0551" target="_black">https://www.npmjs.com/search?q=@liuxy0551/eslint-config-liuxy0551</a> 可以看到发布的包。

> **常见错误**
> 第一次发布失败后出现 Current HEAD is already released
> 执行`lerna publish from-package`

&emsp;&emsp;`可选步骤`删除测试发布的 npm 包：

``` bash
npm unpublish @liuxy0551/eslint-config-liuxy0551-react --force
npm unpublish @liuxy0551/eslint-config-liuxy0551-typescript --force
npm unpublish @liuxy0551/eslint-config-liuxy0551-prettier --force
npm unpublish @liuxy0551/eslint-config-liuxy0551-basic --force
npm unpublish @liuxy0551/eslint-config-liuxy0551 --force
```


### 参考资料

1、<a href="https://juejin.cn/post/6844903856153821198" target="_black">Lerna 中文教程详解</a>   
2、<a href="https://www.ahwgs.cn/ruhechuangjianzijideeslintpeizhibao.html" target="_black">如何创建自己的ESLint配置包</a>   
3、<a href="https://segmentfault.com/a/1190000023954051" target="_black">Lerna --多包存储管理工具（一）</a>   
