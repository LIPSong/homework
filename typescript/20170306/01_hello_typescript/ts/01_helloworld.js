document.write('hello world');
var age;
age = 10;
let score = 45;
var name;
name = 'michael';
//静态常量
//static let HOST:string = 'www.baidu.com';
var list;
list = ['1', true, 1];
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.action = function () {
        console.log("名" + name + ",年龄" + age);
    };
}
function Hero() {
    Person.apply(this, arguments);
}
//Hero 继承 Person 属性
Hero.prototype = new Person();
var sixter = new Hero('xiaomei', 8);
//接口
