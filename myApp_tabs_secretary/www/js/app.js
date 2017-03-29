// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',
  'starter.services'])

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
//配置路由
.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
  $stateProvider.state("tabs",{
    url:"/tabs",//路由的路径
    abstract:true,//设置 tabs 页 为模板页
    templateUrl:"templates/tabs.html"//路由的内容
  });
  //设置  IOS android  tabs定位在底部
  $ionicConfigProvider.tabs.position("bottom");
  //不写这个   在android手机上 在顶部
  //第一页   记录
  $stateProvider.state("tabs.recorders",{
    url:"/recorders",
    views:{
      "tab-recorders":{
        //tab-recorders   视图的名字
        templateUrl:"templates/recorders.html"
      }
    }
  });
  // 第二页  好友
  $stateProvider.state("tabs.friends",{
    url:"/friends",
      views:{
      "tab-friends":{
        templateUrl:"templates/friends.html"
      }
    }
  });
  //第三页   圈子
  $stateProvider.state("tabs.circle",{
    url:"/circle",
    views:{
      "tab-circle":{
        templateUrl:"templates/circle.html"
      }
    }
  });
//第四页  设置
  $stateProvider.state("tabs.setting",{
    url:"/setting",
    views:{
      "tab-setting":{
        templateUrl:"templates/setting.html"
      }
    }
  });
  $urlRouterProvider.otherwise("/tabs/recorders")


})
