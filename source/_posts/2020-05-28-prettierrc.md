---
title: Prettier 的配置
urlname: prettierrc
tags:
  - vscode
categories:
  - 开发工具
  - vscode
author: liuxy0551
copyright: true
date: 2020-05-28 17:05:57
updated: 2020-05-28 17:05:57
---

&emsp;&emsp;代码格式化插件，记录一下自定义配置。

<!--more-->

### 一、vscode 中使用 Prettier

#### 1、安装插件

&emsp;&emsp;搜索并安装插件`Prettier - Code formatter`

#### 2、添加配置文件

&emsp;&emsp;在项目根目录添加配置文件`.prettierrc`，如下：

```json
{
  "printWidth": 140,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

| 序号 | 配置项        | 参数值  | 代表意义                                                        |
| ---- | ------------- | ------- | --------------------------------------------------------------- |
| 1    | printWidth    | 140     | int，达到该宽度即换行                                           |
| 2    | semi          | false   | bool，在语句末尾添加分号                                        |
| 3    | singleQuote   | true    | bool，使用单引号而非双引号                                      |
| 4    | trailingComma | 'none'  | 'none'/'es5'/'all'，在任何可能的多行中输入尾逗号                |
| 5    | arrowParens   | 'avoid' | (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 |

#### 3、保存自动格式化代码 `可选`

&emsp;&emsp;在`settings.json`中添加如下代码：

```
  "editor.formatOnSave": false
```
