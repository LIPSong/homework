/**
 * Created by Administrator on 2017/3/20.
 */
//在定义其他模块名的时候
//尽量应用程序入口的模块名.其他模块名
    var app=angular.module("app.controllers",[])
//在调用 控制器函数的时候哦 需要传两个参数
//控制器的名字
//回调函数 > 会得到 angular中的服务
//在自定义angular的服务的时候 不要以$开始了 因为$都是angular内置的服务
//$scope 只在当前的控制器中起作用
    app.controller("homeController",function ($scope) {
        $scope.person ={
            name:"小明"
        };
        $scope.toRequestAction = function () {
            var request = new XMLHttpRequest();
            request.open("GET","package.json");
            request.onload=function () {
                console.log(request.response);
                $scope.$apply(function () {
                    $scope.data =JSON.parse(request.response);
                })
            }
            request.send();
        };
        $scope.age = 0;
        $scope.$watch("age",function (newValue,oldValue) {
         console.log(newValue,oldValue);
        });
    });
    app.controller("findController",function ($scope,ajax,action) {
        ajax.get("",function () {
            
        });
        $scope.name = 'song';
        $scope.showInfo = action.showInfo;
    })
// window.$ = window.$||{};
// $.tt={};