---
title: JavaScript 中的原型和原型链
urlname: js-prototype
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2020-01-07 12:17:36
updated: 2020-10-21 10:34:54
---


&emsp;&emsp;这里做做原型和原型链的笔记。

<!--more-->

**文字理解：**

&emsp;&emsp;每个函数都有一个`prototype`属性，当这个函数作为构造函数的时候，实例化出来的函数(以下称实例)会有一个`__proto__`属性，这个`__proto__`属性指向构造函数的`prototype`。
&emsp;&emsp;实例通过`prototype`来访问其父元素的属性和方法，依次迭代访问构成原型链，直到 Object 原型的`prototype`为`null`，此时位于原型链的顶端。
&emsp;&emsp;每个实例原型都有一个`constructor`属性指向关联的构造函数。

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/5.png)


### 一、构造函数创建对象

#### 1、prototype

　　每个函数都有一个 prototype 属性，如利用构造函数 Student 创建实例对象 stuA 和 stuB：

``` javascript
function Student () { }
Student.prototype.name = 'Simon'

let stuA = new Student()
let stuB = new Student()

console.log(stuA.name) // Simon
console.log(stuB.name) // Simon
```

　　函数的 prototype 属性指向调用该构造函数而创建的实例的原型，也就是上述代码中 stuA 和 stuB 的原型，如下图：

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/1.png)


#### 2、`__proto__`

　　这是每一个 JavaScript 对象（除 null）都具有的一个属性，这个属性会指向该对象的原型。验证：

``` javascript
function Student () { }

let stu = new Student()

console.log(stu.__proto__ === Student.prototype) // true
```

　　实例对象和构造函数都可以指向原型，如下图：

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/2.png)


#### 3、constructor

``` javascript
function Student () { }

let stu = new Student()

console.log(Student === Student.prototype.constructor) // true
```

　　每个原型都有一个 constructor 属性指向关联的构造函数，如下图所示构造函数、实例原型和实例之间的关系：

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/3.png)


>**综上可以得出：**
``` javascript
function Student () { }

let stu = new Student()

console.log(stu.__proto__ === Student.prototype)              // true
console.log(Student.prototype.constructor === Student)        // true
console.log(Object.getPrototypeOf(stu) === Student.prototype) // true, getPrototypeOf 可以获得对象的原型
```


### 实例与原型

　　当读取实例对象的属性时，如果找不到，则查找与对象关联的原型中的该属性，如果还是找不到，则去查找原型的原型，一直找到最顶层。如：

``` javascript
function Student () { }
Student.prototype.name = 'zhangsan'

let stu = new Student()

stu.name = 'lisi'
console.log(stu.name) // lisi
delete stu.name
console.log(stu.name) // zhangsan
```

　　在 delete 了实例 stu 的 name 属性后，从 stu 就找不到 name 属性就会从 stu 的原型也就是`stu.__proto__`，也就是 Student.prototype 中查找 name 属性。


### 原型的原型

　　如果在 stu 的原型没有找到 name 属性的话，就会在 stu 的原型的原型上查找 name 属性，那原型的原型是什么呢？

前面有提到原型也是对象，其实原型对象就是通过 Object 构造函数创建的，实例的 __proto__ 指向构造函数的 prototype，如下图：

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/4.png)


### 原型链

　　那么 Object.prototype 的原型呢？

``` javascript
console.log(Object.prototype.__proto__) // null
```

　　Object.prototype 的原型是 null，即 Object.prototype 没有原型。意味着查找属性的时候查到 Object.prototype 就可以停止查找了。

![](https://images-hosting.liuxianyu.cn/posts/js-prototype/5.png)

　　上图中相互关联的原型组成的链状结构就是原型链，也就是上图中蓝色的线。
