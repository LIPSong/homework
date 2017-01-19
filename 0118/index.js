 	  var h1 = document.getElementsByTagName("h1")[0];
 	  var btn = document.getElementsByTagName("button")[0];
 	  btn.onclick = function() { 
 	  	
	 	  if(window.XMLHttpRequest){
	 	    var xhr = new XMLHttpRequest();
	 	  }else{
	 	  	var xhr = new ActiveXObject("Microsoft.XMLHttp");
	 	  }
	 	  xhr.onreadystatechange = function() {
	 	  	console.log (xhr.readyState);
	 	  	if(xhr.readyState == 4){
	 	  		var num = function(){
			 	  	var a = 1000;
			 	  	for(var i = 0;i<99999999;i++){
			 	  		a += Math.sqrt(Math.sqrt(Math.sqrt(i)));
			 	  	}
			 	  	console.log(a);
			 	  	return a;
			 	  }
	 	  		h1.innerHTML = num();
	 	  	}
	 	  };
	 	  xhr.open("GET","hello.txt",true);
	 	  xhr.send();
	 	  h1.innerHTML = "修改中";
	 	  console.log("b");
	 	  
	 	  
 	  }
 	  
 	  console.log("js");