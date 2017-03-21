angular.module('app.controllers',[])
.controller('homeController',function($scope,saveLocation){
	$scope.book = {};
	$scope.books = saveLocation.read('books')||[];
	$scope.toSave = function(info){
		this.books.push(new Book(info.title,info.price));
		saveLocation.save('books',this.books);
	}
})