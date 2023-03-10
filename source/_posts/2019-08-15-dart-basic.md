---
title: Dart 基础知识
urlname: dart-basic
tags:
  - Dart
categories:
  - 前端
  - Dart
author: liuxy0551
copyright: true
date: 2019-08-15 11:21:21
updated: 2019-08-15 11:21:21
---


　　最近学习了一下`Dart`，做一些基础笔记。
<!--more-->

　　我是看 [IT 营大地老师的视频](https://www.bilibili.com/video/av52490605) 学习的，感觉大地老师讲的很不错，以前 Angular 入门也是看大地老师的视频。再次致谢。

### 常量
`const` `final`
``` dart
const PI = 3.1415926;
final PI = 3.1415926;
```

### String 字符串
`isEmpty`
``` dart
String str = '1+1=${1+1}';          // 1+1=2
```

### int 整型
``` dart
var myNum = int.parse('123');
if (myNum.isNaN) { }
```

### double 浮点型
``` dart
var d1 = double.parse('123');
var d2 = double.parse('123.1');
```

### bool
`true` `false`

### List 数组
`length` `isEmpty` `isNotEmpty` `reversed`
`add` `addAll([])` `indexOf()` `remove()` `removeAt(index)` `fillRange()` `insert()` `insertAll()` `join()` `slit()` `forEach()` `map()` `any()` `every()`
``` dart
var list1 = [1, 2, 3, 4, 5];
print(list1[1]);

var list2 = list1.reversed.toList();

var list3 = new List();
list3.add(1);
list3.add(2);

// 指定类型 只能存放 String 类型
var list4 = new List<String>();
```

### Set 元素不允许重复
``` dart
var s = new Set();
var list = s.toList();          转换成数组
```

### Map 字典
`keys` `values` `isEmpty` `isNotEmpty`
`addAll()` `remove(key)` `containsKey()` `containsValue()`
``` dart
var person = { "name": "zhangsan", age: 20, "work": ["程序员", "送外卖"] };

var p = new Map();
p['name'] = '张三';
p['age'] = 20;
p['work'] = ["程序员", "送外卖"];

print(p.keys.toList());
print(p.values.toList());
```

### 类型判断
`is`
``` dart
var str = '123';
if (str is String) {
  print('String');
} else if (str is int) {
  console.log('int')
} else {
  console.log('其他类型')
}
```

### 运算符
`+` `-` `*` `/` `%` `~/`取整 `>` `<` `>=` `<=` `=` `==` `|` `&&` `||` `??=` `+=` `-=` `*=` `/=` `%=` `~/=` `++` `--`
``` dart
int a = 10;
int b ??= a;        // b为空的时候将a的值给b
print(b);           // 10
```

### 三目运算符
`??`
``` dart
var a = 22;
var c = a ?? 33;
```

### if else, switch case
``` dart
if () { }
else if () { }
else () { }

switch (gender) {
  case 'male':
    break;
  case 'female':
    break;
  default: 
    print('参数错误');
}

try { }
catch (err) { }
```

### 循环
`for` `while`
``` dart
for (int i = 0; i < 10; i++) {
  print(i);
  continue;
}

while (){
  break;
}

do {

} while ()
```
### Function
``` dart
void printInfo (String username, int age) {
  print('hello func');
  // return ;
}

// 可选参数
void printInfo (String username, [int age]) {
  if (age != null) {
    print('passed age');
  }
}

// 默认参数
void printInfo (String username, [int age, String gender = 'male']) {
  if (age != null) {
    print('passed age');
  }
}

// 命名参数
void printInfo (String username, {int age, String gender = 'male'}) {
  if (age != null) {
    print('passed age');
  }
}

// 箭头函数
List list = [1,2,3];
var newList = list.map((value) => value * 2);

// 自执行函数
((){ })();
```

### Class 类
``` dart
class Person {

  static var PI = 3.1415926;            // Person.PI
  static void show () { }

  String name;
  String city;
  int _age;         // _ 私有方法(类必须提取到一个文件中才有效)
  String _gender;

  // 默认构造函数的简写
  Person(this.name):_gender='male',_age=18;
  // 命名构造函数
  Person.now () {
    print('我是命名构造函数');
  }
  // var p1 = Person.setInfo('zhangsan', 18);
  Person.setInfo (String name, this.city) {
    print('我是命名构造函数');
  }
  // 工厂构造函数
  factory Person (String name) {
    return new Person._internal(name);
  }
  Person._internal(this.name);

  void printInfo () {
    print(Person.PI);
    print(PI);
    print(this.name);
    print(name);
  }
  // getter setter
  String get genderValue {
    return this._gender;
  }
  set genderValue(value) {
    this._gender = value;
  }

  // _ 私有方法
  _setGender (String gender) {
    this._gender = gender;
  }

  // 操作符重载
  String operator +(Person p) {
    return '${this.name} & ${p.name}';
  }
}

class Student extends Person {
  String idNum;
  Student(String name, this.idNum) : super(name) { }
  Student(this.idNum, String name, [String city = 'hangzhou']) : super.setInfo(name, city) { }

  @override
  void printInfo() {
    print(this.idNum);
    // TODO: implement printInfo
    super.printInfo();
  }
}
```

### is as
``` dart
Person p = new Person();
// 类型判断
if (p is Person) { }
// 类型转换
(p as Person).printInfo();
// 连对操作
p..name = 'zhangsan'
..city = 'hangzhou';
```

### 抽象类
``` dart
abstract class Animal {
  eat();
  printInfo () {
    print('抽象类的方法');
  }
}

class Dog implements Animal {
  @override
  eat() {
    // TODO: implement eat
    return null;
  }
  @override
  printInfo() {
    // TODO: implement printInfo
    return null;
  }
}

class Cat extends Animal {
  @override
  eat() {
    // TODO: implement eat
    return null;
  }
  // superInfo 可以使用抽象类的方法
}
```

### 多接口
``` dart
abstract class A { }
abstract class B { }
class C implements A,B { }

// mixins
class A { }
class B { }

// 作为mixin类不能有继承，且不能有构造函数, 相同方法， 后面会覆盖前面的方法
// class C with A,B { }

class C extends Person with A,B {
  C(String name) : super(name) { }
}

var c = new C; 
print(c is C);          // true
print(c is Person);     // true
print(c is A);          // true 
print(c is B);          // true
```

### 泛型
``` dart
T getData<T> (T value) {
  return value;
}

T getData<int> (T value) {
  return value;
}

// eg
getData('hello')
getData<String> ('hello')
```

### 系统库、第三方库、自定义库

>* 系统库
``` dart
import 'dart:io';
import 'dart:math';
import 'dart:convert';
```

>* 第三方库
>* pubspec.yaml 添加包及版本号
``` dart
dependences: 
   http: ^0.12.0+2
```
pub get 进行安装，然后就可以使用了
``` dart
import 'package:http/http.dart' as http;
```

>* 自定义库
``` dart
import 'lib/Animal.dart';
```

>* 类名冲突
``` dart
import 'lib/Person1.dart';      // Person 
import 'lib/Person2.dart';      // Person
```

>* 部分引入
``` dart
import 'lib/myMath' show getAge;        // 只引入 getAge
import 'lib/myMath' hide getName;       // getName 不被导入，其他都引入
```

>* 延时加载（懒加载）
>* deferred as 当使用的时候需要调用 loadLibrary() 来加载
``` dart
import 'package:defered/hello.dart' deferred as hello;
greet () async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```
