(function(){
	var app = angular.module("app",[])
	app.directive("ucai",function(){
		return {
			//元素E
			//属性A
			//类C
			//注释M
			restrict:"E",
			template:"<div><h1>优才</h1><p>厉害</p></div>"
		}
	});
	app.directive("web",function(){
		return {
			restrict:"EA",
			scope:{
				content:"@"
			},
			template:"<div>{{content}}</div>"
		}
	});
	app.directive("vv",function(){
		return{
			scope:{
				content:"@",
				active:"&"
			},
			template:"<button ng-click='active()'>{{content}}</button>"
		}
	});
	app.controller("homeController",function($scope){
		$scope.name = "jhon";
		$scope.showInfo = function(){
			alert("zz");
		}
	});
})()