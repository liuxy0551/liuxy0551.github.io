---
title: JavaScript 中的循环
urlname: js-xunhuan
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-11-29 15:26:39
updated: 2019-11-29 15:26:39
---


　　最近在加强 JavaScript 基础的学习，这里整理了一下 JavaScript 中的循环，包括：`for`、`while`、`do while`三种循环和`continue`、`break`两个关键字。
<!--more-->


### 一、for 循环

1. for 循环可以重复执行某些相同的代码
2. for 循环通过计数器可以重复执行些许不同的代码
3. for 循环可以重复执行某些操作，比如算术运算符加法操作
4. 双重 for 循环，外层循环一次，内存 for 循环全部执行
5. for 循环是循环条件和数字直接相关的循环


### 二、while 循环

　　`while`语句可以在条件表达式为真的前提下，循环执行指定的一段代码，直到条件表达式不为真时结束循环。

``` javascript
while (条件表达式) {
  // 循环体代码
}
```

　　`执行思路`：
1. 先执行条件表达式，如果为 true，则执行循环体代码；如果为 false，则退出循环，执行后续代码。
2. 循环体代码执行一次后，程序会继续判断执行条件表达式，如果条件表达式结果仍为 true，则继续执行循环体代码，直到条件表达式的结果为 false，整个循环过程才会结束。

　　`举例`：
``` javascript
let num = 1
while (num <= 100) {
  console.log(num)
  num ++                // 要进行计数器的更新，防止出现死循环
}
```


### 三、do while 循环

　　`do while`语句是 while 语句的一个变体，该循环会先执行一次代码块，然后对条件表达式进行判断，如果条件表达式的结果为 true，就会重复执行循环体，否则退出循环。

``` javascript
do {
  // 循环体代码
} while (条件表达式)
```

　　`执行思路`：
1. 先执行一次循环体代码
2. 再执行条件表达式，如果条件表达式结果为 true，则继续执行循环体代码，如果条件表达式结果为 false，则退出循环，执行后续代码。

　　`举例`：
``` javascript
let num = 1
do {
  console.log(num)
  num ++                // 要进行计数器的更新，防止出现死循环
} while (i <= 100)
```


### 四、continue

　　`continue`关键字用于立即`跳出本次循环，继续下一个循环`（本次循环体中 continue 之后的代码就会少执行一次）

　　`举例`：求 1 ~ 100 之间，除了能被 7 整除之外的整数和
``` javascript
let sum = 0
for (let i = 0; i <= 100; i ++) {
  if (i % 7 === 0) {
    continue
  }
  sum += i
}

console.log(sum)        // 4315
```


### 五、break

　　`break`关键字用于立即`跳出整个循环`（本次循环结束）

　　`举例`：求 1 ~ 100 之间，除了能被 7 整除之外的整数和
``` javascript
let sum = 0
for (let i = 0; i <= 10; i ++) {
  if (i === 4) {
    break
  }
  sum += i
}

console.log(sum)        // 6, 1 + 2 + 3 = 6
```
