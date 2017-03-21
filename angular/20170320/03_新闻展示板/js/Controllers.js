(function(){
	angular.module('app.controllers',[])
		.controller('postNewsController',function($scope,dataManager,$rootScope){
			function events(){
				$scope.toPost = function(newsInfo){
					console.log(newsInfo);	
					this.newsList.push(new News(newsInfo.image,newsInfo.title,newsInfo.des));
					dataManager.save('newsList',this.newsList);
				}
			}
			function init(){
				$rootScope.message = 'message';
	        		$scope.news={};
				$scope.newsList = dataManager.read('newsList')||[];
				$rootScope.newsList = $scope.newsList; 

				events();
			}	
			init();
		})
		.controller('readNewsController',function($scope,dataManager,$rootScope,$interval){
			$scope.list = dataManager.read('newsList')||[];
			$scope.list = $rootScope.newsList;
			$scope.num = 1;
			$interval(function(){
				$scope.num ++;
			},1000)
			$scope.update = function(){
				console.log($rootScope.message);
				this.list = dataManager.read('newsList')||[];
			}
        });

})()