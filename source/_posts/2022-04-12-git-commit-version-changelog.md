---
title: 规范 git commit、设置版本号、自动生成 changelog
urlname: git-commit-version-changelog
tags:
  - git
categories:
  - git
author: liuxy0551
copyright: true
date: 2022-04-12 15:49:25
updated: 2022-04-12 15:49:25
---


&emsp;&emsp;在开源项目中，规范的 commit message 可以让修改记录更简洁明了，记录下借助工具实现规范的 git commit。这里主要介绍 <a href='https://github.com/commitizen/cz-cli' target='_black'>commitizen</a>、<a href='https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli' target='_black'>conventional-changelog-cli</a>、<a href='https://github.com/conventional-changelog/standard-version' target='_black'>standard-version</a> 这三款工具。


<!--more-->

&emsp;&emsp;全局安装是为了本地方便运行，`-D` 安装是为了方便 CI。

### 一、commitizen

#### 1.1、安装

&emsp;&emsp;<a href='https://github.com/commitizen/cz-cli' target='_black'>commitizen</a> 是一款标准化 git commit 的工具，在没有规范的情况下，开发人员的 commit message 通常是随意的，这就导致 commit message 显得有些无用。可是当你在做git log、code review、编写 changelog 等情况时，良好的 commit 规范就显得尤为重要。

``` bash
npm install commitizen -g
```
``` bash
npm install commitizen -D
```
&emsp;&emsp;使用 commitizen 来安装`cz-conventional-changelog`，commitizen 安装 cz-conventional-changelog 后会自动在 package.json 中添加如下配置：

``` bash
commitizen init cz-conventional-changelog --save-dev --save-exact
```

``` json package.json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

&emsp;&emsp;安装并添加完成后，便可以使用`git cz`命令来替换`git commit`了。修改一个文件并`git add`后，通过`git cz`试一下：

![](https://images-hosting.liuxianyu.cn/posts/git-commit-version-changelog/1.png)

| 类型 | 描述 |
| ---- | ---- |
| feat | 新增功能 |
| fix | bug 修复 |
| docs | 文档更新 |
| style | 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑) |
| refactor | 重构代码(既没有新增功能，也没有修复 bug) |
| perf | 性能, 体验优化 |
| test | 新增测试用例或是更新现有测试 |
| build | 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交 |
| ci | 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交 |
| chore | 不属于以上类型的其他类型 |
| revert | 回滚某个更早之前的提交 |

>**注意**
> 如果想修改已经打好的 commit message，我们可以通过`git reset HEAD~`命令来修改


#### 1.2、commit message 的格式规范

&emsp;&emsp;commit message 包含三个部分：Header、Body、Footer，一般 Header 是必需的，Body 和 Footer 可以省略。`Header`部分只有一行，包括三个字段：`type`（必需）、`scope`（可选，用于定义 type 的影响范围）和`subject`（必需，commit 的简短描述）。


### 二、conventional-changelog-cli

#### 2.1、安装

&emsp;&emsp;<a href='https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli' target='_black'>conventional-changelog-cli</a> 默认推荐的 commit 标准是来自 angular，还有其他可选值：atom, codemirror, ember, eslint, express, jquery。可用来生成`CHANGELOG.md`。

``` bash
npm install conventional-changelog-cli -g
```
``` bash
npm install conventional-changelog-cli -D
```

&emsp;&emsp;在项目根目录执行以下命令，不会覆盖以前的`CHANGELOG.md`，只会在`CHANGELOG.md`的头部加上自从上次`git push`以来的变动。`-s`表示读写同一文件，`-r`表示生成 changelog 所需要使用的发布版本数量，默认为 1，全部则是 0。

``` bash
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```


#### 2.2、自定义参数

&emsp;&emsp;生成的 changelog 中有些常用内容可以通过自定义参数来根据需求更改，例如版本号、commit 地址等等。

- 版本号是从 package.json 中获取的 version 字段值；
- commit 地址是从 package.json 中获取的 repository 字段值；
- issue 地址是从 package.json 中获取的 repository 字段值；

&emsp;&emsp;如果你使用了第三方的协作系统，那么在生成 changelog 后可以使用 replace 工具（` --quiet` 表示不输出 replace 日志）来处理文本中的原有地址：

``` bash
replace 'https://github.com/myproject/issues/' 'https://redmine.example.com' CHANGELOG.md --quiet
```

&emsp;&emsp;<a href='https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core' target='_black'>点此查看</a> 更多配置选项。



### 三、standard-version

#### 3.1、安装

&emsp;&emsp;<a href='https://github.com/conventional-changelog/standard-version' target='_black'>standard-version</a> 是一款遵循语义化版本 <a href='https://semver.org/' target='_black'>semver</a> 和 <a href='https://conventionalcommits.org/' target='_black'>commit message 标准规范</a> 的版本和 changelog 自动化工具。通常情况下，我们会在 master 分支进行如下的版本发布操作：

> 1、git pull origin master
> 2、根据 package.json 中的 version 更新版本号，更新 changelog
> 3、git add ., 然后 git commit
> 4、git tag 打版本操作
> 5、push 版本 tag 和 master 分支到仓库

&emsp;&emsp;其中 2，3，4 是 standard-version 工具会自动完成的工作，配合本地的 shell 脚本，就可以完成一系列版本发布的工作了。

``` bash
npm install standard-version -g
```
``` bash
npm install standard-version -D
```


#### 3.2、命令

&emsp;&emsp;在项目根目录执行 standard-version 命令，可以在控制台看到整个执行流程的 log 信息，在这里几个常用的参数需要注意下:

``` bash
standard-version
```

1、**--release-as, -r 指定版本号**

&emsp;&emsp;默认情况下，工具会自动根据 主版本（major）、次版本（ minor）、修订版（patch）规则生成版本号，例如如果你 package.json 中的 version 为 1.0.0, 那么执行后版本号则是：1.0.1。自定义可以通过：

``` bash
standard-version -r minor // 1.1.0
standard-version -r 2.0.0 // 2.0.0
standard-version -r 2.0.0-test // 2.0.0-test
```

2、**--prerelease, -p 预发版本命名**

&emsp;&emsp;用来生成预发版本, 如果当期的版本号是 2.0.0，例如

``` bash
standard-version --prerelease alpha // 2.0.0-alpha.0
```

3、**--tag-prefix, -t 版本 tag 前缀**

&emsp;&emsp;用来给生成 tag 标签添加前缀，例如如果前版本号为 2.0.0，则：

``` bash
standard-version --tag-prefix "stable-" // tag: stable-v2.0.0
```

&emsp;&emsp;以上几个参数用得会多一些，还有其他选项可以通过`standard-version --help`查看。


#### 3.3、集成 npm

&emsp;&emsp;把命令集成到 package.json 的 scripts 中, 并配合 shell 脚本使用, 如下：

``` json package.json
"scripts": {
  "release": "./scripts/release.sh",
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md && npm run change-issue-url",
  "change-issue-url": "replace 'https://github.com/myproject/issues/' 'https://redmine.example.com/' CHANGELOG.md"
}
```

``` sh release.sh
#!/bin/bash

# Release branch
branch="master"
prefix="v"

git pull origin $branch
echo "Current pull origin $branch."

# Auto generate version number and tag
standard-version -r $release --tag-prefix $prefix

git push --follow-tags origin $branch

echo "Git push origin $branch"
echo "Release finished."
```


### 四、使用 husky 校验

&emsp;&emsp;<a href='https://github.com/typicode/husky' target='_black'>husky</a> 主用功能是为 git 添加钩子，它允许我们在 git 的一些重要动作发生时触发动作(npm script), 比如我们可以在 git push 之前执行特定的自定义脚本对代码进行单元测试、又或者在 git commit 之前执行 eslint 校验。

``` bash
npm install husky -D
```

``` json package.json
"husky": {
  "hooks": {
    "pre-commit": "echo commit 之前的动作",
    "commit-msg": "echo $HUSKY_GIT_PARAMS $HUSKY_GIT_STDIN",
    "pre-push": "echo push 之前的动作"
  }
}
```















