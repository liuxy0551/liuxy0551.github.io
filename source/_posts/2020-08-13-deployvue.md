---
title: 写一个 Vue 项目的自动化部署插件 —— deployvue
urlname: deploy-vue
tags:
  - npm
  - node
  - vue
  - 自动化部署
categories:
  - 前端
  - vue
  - 自动化部署
author: liuxy0551
copyright: true
date: 2020-08-13 16:20:39
updated: 2020-08-18 15:54:14
---

&emsp;&emsp;最近抽空写了个 Vue 项目的部署插件`deployvue`，设置部署参数后可以实现`npm run deploy`一条命令完成部署更新。

<!--more-->

&emsp;&emsp;具体如何使用，可移步 <a href="https://github.com/liuxy0551/deployvue#readme" target="_black">README.md</a> 查看。这里不过多介绍使用方法，主要记录一下遇到的一些点。

![](https://images-hosting.liuxianyu.cn/posts/deploy-vue/1.gif)

### 一、部署流程

&emsp;&emsp;公司的部署发布流程是：
&emsp;&emsp;1、git 提交代码到远程仓库
&emsp;&emsp;2、用 Jenkins 点击对应工程的 Build 按钮，执行脚本
&emsp;&emsp;3、运维服务器端执行 git pull 拉取对应分支的代码
&emsp;&emsp;4、npm install
&emsp;&emsp;5、npm run build
&emsp;&emsp;6、在运维服务器通过 scp 命令将打包后的文件夹传输到（多台，做了负载均衡）部署服务器。

&emsp;&emsp;`deployvue`的部署流程是：
&emsp;&emsp;1、执行 build 命令
&emsp;&emsp;2、自动压缩打包后的文件夹
&emsp;&emsp;3、连接服务器，创建部署目录及备份目录（用于回退版本）
&emsp;&emsp;4、scp 将打包后的压缩包上传到服务器指定路径
&emsp;&emsp;5、利用已有的服务器连接，在服务器端解压压缩包
&emsp;&emsp;6、删除本地的打包文件及压缩包，部署完成。
&emsp;&emsp;相较于公司当前的部署方式，有个优点就是不需要在服务器存放代码，主要是不需要在服务器存储`node_modules`，毕竟`node_modules`文件夹动辄200M+，公用本地的`node_modules`可以减少服务器磁盘占用。


### 二、node 模块

#### 1、commander

&emsp;&emsp;用来接收终端输入的命令
```
const { program } = require('commander')
const packageJson = require('../package.json')

program.version(packageJson.version, '-V, --version')
program.command('build').description('build code').option('-e, --env <env>', 'environment', '').action(require('./actions/build'))
...

// 解析参数这一行要放到定义的命令最后面
program.parse(process.argv)
```

#### 2、archiver

&emsp;&emsp;用来压缩打包后的文件夹
```
archive.directory(`${ process.cwd() }/${ deployConfig.archiveRootDir }`, false)
```

#### 3、chalk

&emsp;&emsp;用来输出不同颜色的信息内容到终端，起到不同的提示作用，不同软件可能输出的颜色有色差，主要集中在 blue 和 cyan。
```
console.log(chalk.cyan('hello deployvue'))
```

#### 4、node-ssh

&emsp;&emsp;用来连接服务器，需要在指定目录下操作的，需要把命令连起来，因为 execCommand 执行时都是从 `~` 路径下开始执行的
```
// 把压缩包 move 到备份文件夹
await ssh.execCommand(`cd ${ deployConfig.deployTo }; ${ unArchiveCommand }; mv ${ deployConfig.archiveRootDir }-${ date }.tar ${ deployConfig.archiveRootDir }-history`)
// 仅保留特定数量的压缩包文件 - 保留文件夹下最新的特定数量文件
await ssh.execCommand(`cd ${ deployConfig.deployTo }/${ deployConfig.archiveRootDir }-history; ls -t | awk 'NR > ${ deployConfig.keepReleases + 1 } {print "rm -rf "$0}' | sh`)
```

#### 5、shelljs

&emsp;&emsp;用来在本地执行命令、结束程序
```
for (let command of buildCommands) {
  console.log(`+ ${ command }`)
  if (shell.exec(`${ command }`).code !== 0) {
    shell.echo(`Run: ${ command } Error`)
    shell.exit(1)
    return
  }
  console.log(chalk.cyan(`DONE  ${ command } complete`))
}
```



### 三、npm link

&emsp;&emsp;在本地开发 npm 命令行工具时，可以使用`npm link`将开发模块指向到对应的运行项目中，方便调试。

#### 1、绑定指向

&emsp;&emsp;在`deployvue`项目目录下执行：
```
npm link
```
- （Mac OS）会在`/usr/local/lib/node_modules`下新增`deployvue`整体项目的快捷方式
- （Mac OS）会在`/usr/local/bin`下新增`deployvue/bin/index.js`的快捷方式


#### 2、解除绑定指向

&emsp;&emsp;在`deployvue`项目目录下执行：
```
npm unlink
```


### 四、npm 删除发布

&emsp;&emsp;在`deployvue`项目目录下执行：
```
npm unpublish deployvue --force
```

&emsp;&emsp;在删除 npm 包的24小时内不可再次发布该 npm 包。

