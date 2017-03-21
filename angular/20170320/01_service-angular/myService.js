angular.module("app.services",[])
//servicename,service content
.service("ajax",function(){
this.get = function(url,callback){
	console.log("It works");
    var request = new XMLHttpRequest();
            request.open("GET","url");
            request.onload=function () {
               callback(request.responseText); 
            }
            request.send();

};
this.myGet = function(url){
	var promise = new Promise(function(resolve,reject){
		console.log("It works");
    var request = new XMLHttpRequest();
            request.open("GET","url");
            request.onload=function () {
               callback(request.responseText); 
            }
            request.send();
	});
};
})
.service("action",function(){
this.showInfo = function(info){
	alert(info);
}
})



















