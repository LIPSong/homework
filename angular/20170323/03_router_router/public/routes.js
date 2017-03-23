(function(){
	angular.module("app.router",["ui.router"])
	.config(function($stateProvider,$urlRouterProvider){
		
		$stateProvider
        		.state("home",{
				url:"/home",
				templateUrl:"home/homeView.html"
			})	
			.state("home.detailView",{
				url:"/detailView",
				views:{
					"innerHome":{
						templateUrl:"home/views/detailView.html"
					}
				}
			})
			.state("home.betterView",{
				url:"/betterView",
				views:{
					"innerHome":{
						templateUrl:"home/views/betterView.html"
					}
				}
			})
			.state("home.hotView",{
				views:{
					"innerHome":{
						templateUrl:"home/views/hotView.html"
					}
				}
			})


			.state("home.detailView.infoDetail",{
				
			})
			.state("find",{
				url:"/find",
				templateUrl:"find/findView.html"
			})

			.state("setting",{
				url:"/setting",
				templateUrl:"setting/settingView.html"
			});

		$urlRouterProvider.otherwise("/home");
	});

})()