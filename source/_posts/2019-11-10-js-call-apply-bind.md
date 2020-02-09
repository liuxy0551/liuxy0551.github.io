---
title: JavaScript 中的 call、apply、bind
urlname: js-call-apply-bind
tags:
  - JavaScript
categories:
  - JavaScript
author: liuxy0551
copyright: true
date: 2019-11-10 20:10:42
updated: 2019-11-10 20:10:42
---


　　最近在加强 JavaScript 基础的学习，这里整理一下 call、apply、bind。
<!--more-->


### 一、call、apply 的定义

　　call 和 apply 可以调用函数，改变`this`指向实现继承和借用别的对象的方法：

　　1、Object.call(新`this`对象, 实参1, 实参2, 实参3...)

　　2、Object.apply(新`this`对象, [实参1, 实参2, 实参3...])


### 二、call、apply 的用法

#### 1、间接调用函数，改变函数作用域的`this`指向
``` javascript
function foo() {
  console.log(this)
}
foo.apply('这里是 apply 改变的 this 值')       // 这里是 apply 改变的 this 值
foo.call('这里是 call 改变的 this 值')         // 这里是 call 改变的 this 值
```
　　实质上是 call 将 foo 中`this`的指向改为 bar，并调用了该函数。call 和 apply 对应的第一个参数就是`this`，如果不传或者传 null、undefined 时，`this`指向`window`。 

#### 2、劫持其他对象的方法

　　实现方法见上一个用法举例中的代码。
``` javascript
var foo = {
  name: '张三',
  logName: function() {
    console.log(this.name)
  }
}

var bar = {
  name: '李四'
}

foo.logName.call(bar)   // 李四
```

#### 3、两个函数实现继承
``` javascript
function Animal(name) {
  this.name = name
  this.showName = function() {
    consloe.log(this.name)
  }
}

function Cat(name) {
  Animal.call(this, name)
}

var cat = new Cat('Black Cat')
cat.showName()                      // Black Cat
```

#### 4、为类数组（arguments、nodeList）添加数组方法，如 push、filter、pop 等：
``` javascript
function argumentsFunc() {
  Array.prototype.push.call(arguments, '王五')
  console.log(arguments)            // ['张三', '李四', '王五']
}

argumentsFunc('张三', '李四')
```

　　这里也出现了另一个知识点，即`当方法没有定义接收数据的参数，但调用方法时传递了参数，如何在方法内使用传递过来的数据`。这里可以使用`arguments`进行接收，arguments 属于类数组，document.getElementByName('className') 拿到的 nodeList 也是类数组。

#### 5、合并数组
``` javascript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
Array.prototype.push.apply(arr1, arr2)
console.log(arr1)           // [1, 2, 3, 4, 5, 6]
```

#### 6、求数组最大值
``` javascript
let arr3 = [7, 8, 9]
console.log(Math.max.apply(null, arr3))     // 9
```

#### 7、判断字符类型
``` javascript
Object.prototype.toString.call({})      // '[object Object]'
Object.prototype.toString.call([])      // '[object Array]'
Object.prototype.toString.call('')      // '[object String]'
```


### 三、bind

　　bind 以后 fooNewBind 重新绑定了方法内部的`this`指向，此时不会调用方法，不兼容 IE8。
    ``` javascript
    var name = '李四'
    var foo = {
      name: '张三',
      logName: function(age) {
        console.log(this.name, age)
      }
    }
    
    var fooNew = foo.logName
    var fooNewBind = foo.logName.bind(foo)
    
    fooNew(10)          // 李四 10
    fooNewBind(11)      // 张三 11
    ```
　　此时如果`bind`换成 call 或者 apply 的话，就需要再加上`age`参数，且会调用方法。


### 四、三者异同

- 同：都是改变函数的`this`指向，都可接收参数
- 异：bind 和 call 是接收单个参数，apply 是接收数组
