---
title: JavaScript 中的 const、var、let
urlname: js-const-var-let
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-11-08 09:41:46
updated: 2020-10-21 10:34:54
---


&emsp;&emsp;ES6 新增了两个重要的关键字：const 和 let，加上之前的 var 有了三个变量的声明方式，整理并记录一下。

<!--more-->


### 一、const

&emsp;&emsp;const 声明一个只读的变量，而且必须初始化。声明后，变量的值就不可以修改。

``` javascript
const a = 2;     // 正确
const b;         // 错误
a += 1;          // 错误
```


### 二、var

&emsp;&emsp;var 无块级作用域，容易造成全局变量污染。定义的变量可以修改，如果不初始化会输出`undefined`，不会报错。

``` javascript
var a = 2;     // 正确
var a;         // 正确
change () {
  a = 4;
  console.log(a);       // 输出 4
}
```


### 三、let

&emsp;&emsp;let 有块级作用域，可以理解为带有块级作用域的 var。函数内部使用 let 定义变量后，对函数外部无影响。

``` javascript
let a = 2;
console.log(a);       // 输出 2
change () {
  let a = 4;
  console.log(a);       // 输出 4
}
```


### 四、const、var、let 的比较

#### 1、const 和 let 的相同点

- 二者都是块级作用域
- 都不能和所在作用域内的其他变量或函数拥有相同的名称

#### 2、const 和 let 的不同点

- const 声明的变量必须初始化，而 let 声明的变量不用
- const 声明的变量不能通过再次修改，也不能再次声明。而 let 声明的变量可以修改。

#### 3、var 声明的变量会挂载到 window 上，const 和 let 声明的变量不会


### 五、const 的本质

&emsp;&emsp;const 声明的变量不可再次修改，但并非是常量，它声明了一个常量引用一个值。使用 const 声明的对象或数组，其实是可变的。下面的代码并不会报错：
``` javascript
const car = { type: 'Fiat', model: '500', color: 'white' };     //  创建常量对象
car.color = 'red';              // 修改属性
car.owner = 'Johnson';          // 添加属性
```
&emsp;&emsp;但是我们`不能对常量对象重新赋值`：
``` javascript
const car = { type: 'Fiat', model: '500', color: 'white' };
car = { type: 'Volvo', model: 'EX60', color: 'red' };           // 错误
```
&emsp;&emsp;const 声明的数组同理，能以下标去修改数组，也能通过 push 方法添加元素，但是`不能重新赋值`。
