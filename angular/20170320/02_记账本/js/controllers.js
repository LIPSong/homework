angular.module("app.controllers",[])
.controller("homeController",function($scope,saveLocation){
	$scope.book = {};
	//init book array
	$scope.books = saveLocation.read("books")||[];
	$scope.toSave = function(info){
		console.log(info);
		var bookkk = new Book(info.title,info.price);
		//现在保存的都是同一个对象只要更改book中的值就会同步更改，所以每次需要重新创建一个对象
		this.books.push(bookkk);
saveLocation.save("books",this.books)
	}
})