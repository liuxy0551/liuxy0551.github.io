---
title: 深拷贝和浅拷贝
urlname: deep-copy-shallow-copy
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2020-03-19 21:12:49
updated: 2020-03-19 21:12:49
---


　　深拷贝、浅拷贝在实际开发中经常应用到，这里记录一些理解。
<!--more-->


### 一、内存中的堆栈（heap、stack）

[JavaScript 中的数据类型以及内存分配](https://liuxianyu.cn/article/js-typeof.html)

&emsp;&emsp;堆和栈都是内存中用来存储的区域：**栈**是自动分配的内存，由系统自动释放；**堆**是动态分配的内存，大小不定同时也不会自动释放。深拷贝和浅拷贝的区别也在于两者在内存中的存储类型有所不同。
&emsp;&emsp;介绍一下基本数据类型和引用数据类型的概念，`基本数据类型`包括：String、Number、Boolean、null、undefined 五类（es6 新引入 Symbol，代表独一无二的值），`引用数据类型`统称为 Object 类型，包括：对象、数组、Date、RefExp、函数等。

- 栈：基本数据类型存放在**栈**里面，数据段简单，数据大小也确定，占用内存空间大小确定，是直接按值存放的，可以直接访问。
- 堆：引用数据类型存放在**堆**里面，object 实际上是一个存放在栈内存的指针，这个指针指向的是堆内存中的地址。

>**注意**
>* 1、js 中基本数据类型的值不可变、引用数据类型的值可变
>* 2、操作字符串返回的都是新字符串，并没有改变原有的字符串
>* 3、基本数据类型比较值，引用数据类型比较引用是否指向同一个对象

### 二、赋值（Copy）

- 基本数据类型：`赋值`，赋值之后两个变量互不影响
- 引用数据类型：`赋址`，两个变量具有相同的引用，指向同一个对象，相互之间有影响。

　　举个赋值的例子：
``` javascript
let a = 'old'
let b = a
a = 'new'
console.log(a, b)  // 'new', 'old'
```

　　举个赋址的例子：
``` javascript
let a = [1, 2, 3, 4, 5, 6]
let b = a
a[0] = 0
console.log(a, b)  // [0, 2, 3, 4, 5, 6], [0, 2, 3, 4, 5, 6]
```


### 三、浅拷贝（ShallowCopy）

&emsp;&emsp;拷贝原始对象，如果原始对象的属性是基本数据类型，拷贝的就是基本数据类型的值；如果原始对象的属性是引用数据类型，那么拷贝的就是引用数据类型的内存地址，如果两个对象中的某一个改变属性值从而影响内存地址，则另一个对象也会受到影响。

#### 1、Object.assign()

&emsp;&emsp;[Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 可以将多个对象的属性复制到目标对象，返回目标对象。下面的代码中，改变对象 a 之后，b 对象的属性中，基本数据类型保持不变，但是引用数据类型发生了对应的变化。

``` javascript
let a = {
  name: 'old',
  info: {
    sex: 1,
    height: 170
  }
}
let b = Object.assign({}, a)
console.log(b)  // { name: 'old', info: { sex: 1, height: 170 }}

a.name = 'new'
a.info.height = 185
console.log(a)  // { name: 'new', info: { sex: 1, height: 185 }}
console.log(b)  // { name: 'old', info: { sex: 1, height: 185 }}
```

#### 2、... 解构

&emsp;&emsp;[展开语法(Spread syntax)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax) 通过实验可以看出效果和`Object.assgin()`一致。

``` javascript
let a = {
  name: 'old',
  info: {
    sex: 1,
    height: 170
  }
}
let b = { ...a }
console.log(b)  // { name: 'old', info: { sex: 1, height: 170 }}

a.name = 'new'
a.info.height = 185
console.log(a)  // { name: 'new', info: { sex: 1, height: 185 }}
console.log(b)  // { name: 'old', info: { sex: 1, height: 185 }}
```

#### 3、Array.slice()

&emsp;&emsp;[slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法的效果可以说明`slice()`方法是浅拷贝。

``` javascript
let a = ['old', true, [0, 1]]
let b = a.slice()
b[0] = 'new'
b[2][0] = 1
console.log(a, b)   // ['old', true, [1, 1]], ['new', true, [1, 1]]
```


#### 4、Array.concat()

&emsp;&emsp;[concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 方法也是浅拷贝，同`slice()`。


### 四、深拷贝（DeepCopy）

&emsp;&emsp;在深拷贝时，会复制原始对象所有的属性，并分配新的内存地址，相比浅拷贝性能消耗较大且速度较慢。拷贝前后的两个对象互不影响。

#### 1、JSON.parse(JSON.stringify(object))

[JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)、[JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 可以达到下述代码中的完全改变 a 而不影响 b 的效果。

``` javascript
let a = {
  name: 'old',
  info: {
    sex: 1,
    height: 170
  }
}
let b = JSON.parse(JSON.stringify(a))
console.log(b)  // { name: 'old', info: { sex: 1, height: 170 }}

a.name = 'new'
a.info.height = 185
console.log(a)  // { name: 'new', info: { sex: 1, height: 185 }}
console.log(b)  // { name: 'old', info: { sex: 1, height: 170 }}
```

数组的深拷贝也可以进行，但是`JSON.parse(JSON.stringify(object))`有几个问题：

- 会忽略 undefined、symbol 和 function
- 处理循环引用的对象会报错
- new Date() 的转换结果不正确，可以考虑转换成字符串或者时间戳再深拷贝
- 不能处理正则

#### 2、递归写法

- 基础类型
- 引用类型
  &emsp;&emsp;RegExp、Date、函数 不是 JSON 安全的
  &emsp;&emsp;会丢失 constructor，所有的构造函数都指向 Object
  &emsp;&emsp;破解循环引用
  
```javascript
function deepCopy (obj) {
  let result
  if (typeof obj === 'object') {
    result = obj.constructor === Array ? [] : {}
    
    for (var i in obj) {
      result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
    }
  } else {
    result = obj
  }
  
  return result
}
```

#### 3、jQuery.extend()

[中文文档](http://jquery.cuishifeng.cn/jQuery.extend.html)、[英文文档](https://api.jquery.com/jQuery.extend/)

#### 4、lodash.cloneDeep()

[lodash.cloneDeep()](https://www.lodashjs.com/docs/lodash.cloneDeep)


### 参考资料

1、[详细解析赋值、浅拷贝和深拷贝的区别](https://muyiy.cn/blog/4/4.1.html)
2、[js 深拷贝 vs 浅拷贝](https://juejin.im/post/59ac1c4ef265da248e75892b)
3、[JavaScript专题之深浅拷贝](https://github.com/mqyqingfeng/Blog/issues/32)
