(function(){
	angular.module('app.services',[])
	.service('dataManager',function(){
	/**
	 * save data
	 */
		this.save = function(key,value){
			localStorage.setItem(key,value?JSON.stringify(value):null);
		};

	/**
	 * read data
	 */
		this.read = function(key){
			return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):null;
		};
	})
})()