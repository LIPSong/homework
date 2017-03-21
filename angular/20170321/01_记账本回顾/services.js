(()=>{
	angular.module('app.services',[])
	.service('saveLocation',function(){
		this.save = function(key,value){
			localStorage.setItem(key,value?JSON.stringify(value):null)
		};
		this.read = function(key){
			return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):null;
		}
	})
})()