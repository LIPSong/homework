/**
 * Created by liuyujing on 2017/3/7.
 */

//只用 数据模型
//协议

//接口 就是一个协议
//只要遵守了这个 协议 就必须按照协议里面的规则  去落实
//没有添加 问号的 都是 强制实现的
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);
for (let j =0;j<10;j++) {
    console.log(j)
}

interface PersonInterface {
    name:string,
    age?:number
}

//接口不可实例化对象

// var xiaoMing:PersonInterface;
// xiaoMing.name = "小明";


/*
* 类：是对 对象的抽象  眼睛 嘴巴 说话 -> 人类(特征)
* 对象：黄琪勇 -> 具体的特征
* */

//让类 实现 接口
//Person 类 去实现接口PersonInterface
//Person 就必须 按照 PersonInterface 指定的规则去实现
class Person implements PersonInterface {

    //静态属性 内存一直在同一个位置
    static type = "人类";
    name:string;
    eyes:string;
    nose:string;
    speak:()=>{}
    // function mouse(){}
    constructor(){

    }
}

console.log(Person.type);

var xiaoMing = new Person();
xiaoMing.name = "小明";
xiaoHong.eyes = "独眼";




class Student implements PersonInterface {
    name:string;
    constructor(){

    }
}

var xiaoHong = new Person();
xiaoHong.name = "xiaoming";