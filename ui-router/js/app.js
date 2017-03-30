angular.module('app',["ui.router"])
.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$stateProvider.state("tabs",{
		url:"/tabs",
		templateUrl:"templates/tabs.html"
	});
	$stateProvider.state("tabs.home",{
		url:"/home",
		views:{
			"tabs-home":{
				templateUrl:"templates/home.html"
			}
		}
	});
	$urlRouterProvider.otherwise("/tabs");
})
