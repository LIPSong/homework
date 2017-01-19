var btn2 = document.getElementsByTagName("button")[1];
btn2.onclick=function(){
var num = function(){
 	  	var a = 1000;
 	  	for(var i = 0;i<99999999;i++){
 	  		a += Math.sqrt(Math.sqrt(Math.sqrt(i)));
 	  	}
 	  	console.log(a);
 	  }
 	  num();
 	 }