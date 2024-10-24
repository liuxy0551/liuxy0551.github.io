---
title: Git 常用命令（十三）—— Git 取消文件更新监听【转载】
urlname: git-order-m
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2021-04-30 11:40:22
updated: 2021-04-30 11:40:22
---


&emsp;&emsp;平常使用 pm2 启动 node 项目时，想要指定日志输出地址，需要创建好日志文件，但是又不想打印的日志页传到仓库，可以新创建日志文件，提交后在忽略该文件的更新监听。

<!--more-->

### 为什么要取消文件监听

&emsp;&emsp;取消文件监听自有它的好处，比如平时开发你可以使用自己的脚本对项目进行更改、打补丁、等等。最常见的手段就是直接修改项目的配置文件`.gitignore`，然后写上你要忽略的文件，比如：

```
node_modules/
dist/
test/
config/index.js
```

&emsp;&emsp;但问题来了，`.gitignore`的修改会被 git 监听到，如果你不介意的话，那么到这里就结束了，但如果你也不想要`.gitignore`也被监听到，那就继续往下看。

### 一、assume-unchanged 和 skip-worktree

- 使用`assume-unchanged`

```
git update-index --assume-unchanged 指定你的文件
// 例如
git update-index --assume-unchanged ./config/index.js
```

&emsp;&emsp;此时放心的去修改`./config/index.js`，你会看到 git 不再去监听它，达到了不改`.gitignore`的的情况下也能取消监听。

- 使用`skip-worktree`

```
git update-index --skip-worktree 指定你的文件
// 例如
git update-index --skip-worktree ./config/index.js
```

&emsp;&emsp;也是一样，放心的去修改`./config/index.js`

&emsp;&emsp;如果你想恢复监听可以输入：

```
git update-index --no-assume-unchanged 文件名
git update-index --no-skip-worktree 文件名
```

&emsp;&emsp;如果你想列出哪些文件使用过`assume-unchanged`或`skip-worktree`，可以输入：

```
git ls-files -v|grep "^h"
git ls-files -v|grep "^S"
```

#### `assume-unchanged`与`skip-worktree`有什么区别

&emsp;&emsp;这两种方式效果功能一样，笔者的初略理解是使用`pull`时有细微差别

- `--assume-unchanged` pull 时，如果远程文件发生与你的取消监听文件有发生了冲突，git 会以远程文件为最新进行覆盖掉旧的，则原先的取消监听文件会失效。

- `--skip-worktree` pull 时，git 会尽力维护你的取消监听文件，确保它们不会被某些情况给覆盖掉，最多就会提示你冲突了，让你手动解决。

结合以上笔者建议使用`skip-worktree`会更稳妥些。


### 二、配置当前项目的`.git\info\exclude`文件

&emsp;&emsp;如果项目没看到有`.git`目录说明是被隐藏掉了，可以通过【查看】进行设置显示，编辑`exclude`文件跟编辑`.gitignore`一样：

```
node_modules/
dist/
test/
config/index.js
```

&emsp;&emsp;OK，就是这么简单！


### 三、全局配置`.gitignore_global`文件

```
cd ~
touch .gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

**解释：**

- 1、`cd ~`表示切换到用户目录
- 2、`touch .gitignore_global`表示新建`.gitignore_global`文件
- 3、最后进行 git 配置
- 4、`.gitignore_global`文件通常放在`C:\Users\用户名`下面
- 5、`.gitignore_global`文件编辑规则和上面一样

```
node_modules/
dist/
test/
config/index.js
```

&emsp;&emsp;这样所有项目就都会生效这套规则啦~

### 注意事项

&emsp;&emsp;以上的任意方式当切换分支时会出现一种特殊情况：即你的取消监听文件（比如 index.js）是项目现有的，然后你对它进行了更改而且 git 也忽略了它，但是当你切换分支时，如果切换分支的（index.js）与当前分支的 index.js 文件有冲突，你是无法切换过去的，它会提示如下：

![](https://images-hosting.liuxianyu.cn/posts/git-order/3.png)

&emsp;&emsp;图中表示`config/index.js`会被即将到来的分支所覆盖，请在切换分支前进行提交。

&emsp;&emsp;因为这个问题笔者也是花费了很多时间去找答案，最终能找到的解决手段是：

- 1、恢复监听
- 2、使用 stash 保留数据 然后切换分支
- 3、stash pop 恢复数据
- 4、重新取消监听

&emsp;&emsp;命令如下：

```
git update-index --no-skip-worktree ./config/index.js
git stash
git checkout 分支名
git stash pop
git update-index --skip-worktree ./config/index.js
```

&emsp;&emsp;虽然繁琐了点，但起码这是目前唯一的手段，因此笔者建议要取消监听的文件最好是新建的，而不是现有的，这样切换不同分支时就不会出现这样的问题，当然也有可能切换的分支刚好跟你新建的文件是相同的那么还是会产生上面情况，总之尽量少对现有的文件进行取消跟踪，因为 git 不知道切换下一个分支时，到底是忽略还是监听。

关于使用哪种方式来取消文件监听笔者最喜欢的当然是 第二和第三种，简单省事 ~


### 参考资料

&emsp;&emsp;1、<a href="https://blog.csdn.net/cookcyq__/article/details/121918646" target="_black">Git 取消 git 文件跟踪/监听的几种方式及注意事项</a>  
&emsp;&emsp;2、<a href="https://www.cnblogs.com/oloroso/p/13367120.html" target="_black">删除 git 仓库中无用大文件</a>  
