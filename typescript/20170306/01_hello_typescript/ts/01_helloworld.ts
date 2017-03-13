document.write('hello world');
var age: number;
age = 10; 
let score:number = 45;
var name:string;
name = 'michael';
//静态常量
//static let HOST:string = 'www.baidu.com';
var list:[string,boolean,number];
list = ['1',true,1];
function Person(name,age){
        this.name = name;
    this.age = age;
    this.action = function(){
        console.log("名"+name+",年龄"+age);   
    }
}
function Hero(){
    Person.apply(this,arguments);
}
//Hero 继承 Person 属性
Hero.prototype = new Person();
var sixter = new Hero('xiaomei',8);
//接口





