(function(){
	var app = angular.module("app",["ui.router"]);
	app.config(function($stateProvider,$urlRouterProvider){
		//分发的每一条路由
		/**
		 * state(argument[1],argument[2]);
		 * 参数一:路由状态的名字
		 * 参数二:具体路由的配置
		 */
			$stateProvider.state('home',{
			url:"/home",
			templateUrl:"views/homeView.html",
//			controller:""
		});
		$stateProvider.state('find',{
			url:"/find",
			templateUrl:"views/findView.html",
//			controller:""
		});
		$stateProvider.state('setting',{
			url:"/setting",
			templateUrl:"views/settingView.html",
//			controller:""
		});
		
		//当不符合所有路由状态去重新指定的路由状态
		$urlRouterProvider.otherwise("/home");
	});
})()