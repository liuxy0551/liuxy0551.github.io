---
title: 深拷贝和浅拷贝
urlname: deep-copy-shallow-copy
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2020-03-17 12:23:01
updated: 2020-03-17 12:23:01
---


　　深浅拷贝在实际开发中经常应用到，这里记录一些理解。
<!--more-->


- 深拷贝（deepCopy）：增加了一个指针，指向原对象的内存地址
- 浅拷贝（shallowCopy）：增加了一个指针并且新申请了一个内存地址，新增加的指针指向这个新的内存地址
- 浅拷贝仅仅是复制内存地址，如果原内存地址改变，那么浅拷贝得来的对象也会发生相应变化；而深拷贝是在内存中开辟新的内存地址来存放复制的对象。

　　简单地理解就是浅拷贝仅拷贝对象的引用，无论修改新老对象，两者都会发生改变；深拷贝则是完全地拷贝一个对象，修改其中一个对象，也不会影响另一个。

　　举个浅拷贝的例子：
``` javascript
let a = [1, 2, 3, 4, 5, 6]
let b = a
a[0] = 0
console.log(a, b)  // [0, 2, 3, 4, 5, 6], [0, 2, 3, 4, 5, 6]
```

　　先介绍一下基本数据类型和引用数据类型的概念，基本数据类型包括：String、Number、Boolean、null、undefined 五类（es6 新引入 Symbol，代表独一无二的的值），引用数据类型统称为 Object 类型，包括：对象、数组、Date、RefExp、函数等。


### 一、数组的浅拷贝

　　可以利用数组的一些方法实现，如：slice、concat，通过这些方法返回新数组的特性来实现拷贝。如：
``` javascript
let a = ['old', 1, true, null, undefined]
let b = a.concat()
b[0] = 'new'
console.log(a, b)   // ['old', 1, true, null, undefined], ['new', 1, true, null, undefined]
```

　　但是如果要拷贝的数组元素不是基本类型，如：
``` javascript
let a = [{ old: 'old' }, true]
let b = a.concat()
a[0].old = 'new'
a[1] = false
console.log(a, b)   // [{ old: 'new' }, false], [{ old: 'new' }, true]
```

　　如果数组中元素是基本类型，就会拷贝一份，且互不影响；但如果有引用类型，就会拷贝引用类型的指向地址。此时，无论修改新旧数组，两者都会发生变化。这种拷贝称之为浅拷贝，显然数组的 concat 和 slice 方法是一种浅拷贝。


### 二、数组的深拷贝

　　介绍一个简单粗暴的方法`JSON.stringify`，但是不能拷贝函数：
``` javascript
let a = ['old', function () { console.log('old') }]
let b = JSON.parse(JSON.stringify(a))
console.log(a, b)
```

![](/images/posts/deep-copy-shallow-copy/1.png)

　　`JSON.stringify`属于工具函数，在将 JSON 对象转化成字符串时用到了 toString 的相关规则，并不是严格意义上的强制类型转换。所有安全的 JSON 值 (JSON-safe) 都可以使用`JSON.stringify`字符串化，undefined、function、symbol 和包含循环引用（对象之间相互引用，形成一个无限循环）的对象 属于不安全的 JSON 值。`JSON.stringify`在遇到 undefined、function、symbol 时会自动将其忽略，在数组中则会返回 null，保证元素位置不变；包含循环引用的对象执行`JSON.stringify`时会出错。


### 三、性能问题

　　深拷贝在使用的时候是完全克隆一个新对象出来，不会对原对象产生影响，但是深拷贝会用到递归循环出原对象的属性，所以性能上不如浅拷贝，开发过程中根据实际情况选择。

参考资料：[JavaScript专题之深浅拷贝](https://github.com/mqyqingfeng/Blog/issues/32)
