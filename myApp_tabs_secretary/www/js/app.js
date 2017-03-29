// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
	//设置ios Android tabs 定位在底部
	$ionicConfigProvider.tabs.position("bottom");
	$stateProvider.state('tabs', {
		url:"/tabs",
		abstract:true,
		templateUrl:"templates/tabs.html"
	});
	$stateProvider.state('tabs.recorders', {
		url:"/recorders",
		views:{
			"tab-recorders":{
				templateUrl:"templates/recorders.html",

			}
		}
	});
	$stateProvider.state("tabs.write",{
		url:"/write",
		views:{
			"tab-recorders":{
				templateUrl:"templates/write.html",
				controller:"RecorderWriteController"
			}
		}
	});
	$stateProvider.state("tabs.friends",{
		url:"/friends",
		views:{
			"tab-friedns":{
				templateUrl:"templates/friends.html"
			}
		}
	});
	$stateProvider.state("tabs.circle",{
		url:"/circle",
		views:{
			"tab-circle":{
				templateUrl:"templates/circle.html"
			}
		}
	});
	$stateProvider.state("tabs.setting",{
		url:"/setting",
		views:{
			"tab-setting":{
				templateUrl:"templates/setting.html"
			}
		}
	});

	$urlRouterProvider.otherwise("/tabs/recorders");
})

