(function(){
	//ngroute是通过路径来指定路由的位置
	//跳转位置可以通过href指定路由的位置
	//把每个路由中的内容显示出来用ng-view
	//inject the Route module
	var app = angular.module("app",["ngRoute"]);
	app.controller('homeController',function(){});
	app.controller('findController',function($scope){
		$scope.title = 'find page';
	});
	//Application configuration 
	app.config(function($routeProvider,$locationProvider){
		$locationProvider.hashPrefix("");
			$routeProvider.when("/home",{
//		template:"<div>home</div>"
//		through templateUrl to assign views files url
		templateUrl:"views/homeView.html",
		controller:'homeController'
	});
	$routeProvider.when("/find",{
		
//		template:"<div>find</div>"
		templateUrl:"views/findView.html",
		controller:'findController'
	});

	//if The above don"t work,redirect to index.html
	$routeProvider.otherwise("/home");
	});
	//every "when" is a conditions or position

})()