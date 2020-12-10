---
title: 写一个 node 项目的部署插件(pm2)
urlname: deploy-node
tags:
  - npm
  - node
  - pm2
  - 自动化部署
categories:
  - node
  - 自动化部署
author: liuxy0551
copyright: true
date: 2020-12-10 15:28:15
updated: 2020-12-10 15:28:15
---

&ensp;&ensp;&ensp;&ensp;最近在写个 node web server，测试阶段部署不是很方便，写个 node 项目的部署插件`pm2node`，设置部署参数后可以实现`npm run deploy`一条命令完成部署更新。同类插件可查看另一篇随笔：<a href="https://liuxianyu.cn/article/deploy-vue.html" target="_black">写一个 Vue 项目的自动化部署插件</a>。

<!--more-->

&ensp;&ensp;&ensp;&ensp;具体如何使用，可移步 <a href="https://github.com/liuxy0551/pm2node#readme" target="_black">README.md</a> 查看。这里不过多介绍使用方法，主要记录一下遇到的一些点。



### 一、部署项目

#### 1、部署前准备

&ensp;&ensp;&ensp;&ensp;服务器端需要提前安装好 git、nginx、node、cnpm（<a href="https://liuxianyu.cn/article/cent-os-base.html#%E4%B8%89-%E5%AE%89%E8%A3%85-git" target="_black">安装 git、安装 nginx</a>）、pm2（<a href="https://liuxianyu.cn/article/node-pm2.html" target="_black">使用 pm2 部署 node 项目</a>）
&ensp;&ensp;&ensp;&ensp;1、ssh 到服务器，并在指定目录位置通过 git clone 拉取代码初始化文件夹
&ensp;&ensp;&ensp;&ensp;2、配置 node 服务的 nginx，服务启动在 9000 端口，http、https 均可访问，配置如下：

```
# 记账啦后端 node api 的 nginx 配置
# http
server {
    listen          80;
    server_name     api.jzl.liuxianyu.cn;

    location / {
	    proxy_pass http://localhost:9000/;
    }
}

# https
server {
    listen       443 ssl;
    server_name  api.jzl.liuxianyu.cn;
    client_max_body_size 50M; 
    client_body_timeout 10m;
    ssl_certificate cert/api.jzl.liuxianyu.cn.pem;
    ssl_certificate_key cert/api.jzl.liuxianyu.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
	    proxy_pass http://localhost:9000/;
    }
}
```

#### 2、部署流程

&ensp;&ensp;&ensp;&ensp;1、本地修改代码，上传到 git
&ensp;&ensp;&ensp;&ensp;2、服务器通过 git 拉取最新代码
&ensp;&ensp;&ensp;&ensp;3、重启 pm2 对应进程


### 二、node 模块

#### 1、commander

&ensp;&ensp;&ensp;&ensp;用来接收终端输入的命令
```
const { program } = require('commander')
const packageJson = require('../package.json')

program.version(packageJson.version, '-V, --version')
program.command('build').description('build code').option('-e, --env <env>', 'environment', '').action(require('./actions/build'))
...

// 解析参数这一行要放到定义的命令最后面
program.parse(process.argv)
```

#### 2、chalk

&ensp;&ensp;&ensp;&ensp;用来输出不同颜色的信息内容到终端，起到不同的提示作用，不同软件可能输出的颜色有色差，主要集中在 blue 和 cyan。
```
console.log(chalk.cyan('hello pm2node'))
```

#### 3、node-ssh

&ensp;&ensp;&ensp;&ensp;用来连接服务器，需要在指定目录下操作的，需要把命令连起来，因为 execCommand 执行时都是从 `~` 路径下开始执行的
```
// 把压缩包 move 到备份文件夹
await ssh.execCommand(`cd ${ deployConfig.deployTo }; ${ unArchiveCommand }; mv ${ deployConfig.archiveRootDir }-${ date }.tar ${ deployConfig.archiveRootDir }-history`)
// 仅保留特定数量的压缩包文件 - 保留文件夹下最新的特定数量文件
await ssh.execCommand(`cd ${ deployConfig.deployTo }/${ deployConfig.archiveRootDir }-history; ls -t | awk 'NR > ${ deployConfig.keepReleases + 1 } {print "rm -rf "$0}' | sh`)
```

#### 4、shelljs

&ensp;&ensp;&ensp;&ensp;用来在本地执行命令、结束程序
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

&ensp;&ensp;&ensp;&ensp;在本地开发 npm 命令行工具时，可以使用`npm link`将开发模块指向到对应的运行项目中，方便调试。

#### 1、绑定指向

&ensp;&ensp;&ensp;&ensp;在`pm2node`项目目录下执行：
```
npm link
```
- （Mac OS）会在`/usr/local/lib/node_modules`下新增`pm2node`整体项目的快捷方式
- （Mac OS）会在`/usr/local/bin`下新增`pm2node/bin/index.js`的快捷方式


#### 2、解除绑定指向

&ensp;&ensp;&ensp;&ensp;在`pm2node`项目目录下执行：
```
npm unlink
```


### 四、npm 删除发布

&ensp;&ensp;&ensp;&ensp;在`pm2node`项目目录下执行：
```
npm unpublish pm2node --force
```

&ensp;&ensp;&ensp;&ensp;在删除 npm 包的24小时内不可再次发布该 npm 包。

