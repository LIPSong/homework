//const util = require('util');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var myObject = (function(){
	var _name = 'seven';//private
	return {
		getName: function(){
	return _name;
}
}
})()
//console.log(myObject.getName());
//console.log(myObject._name);
var Plane = function(){
	this.blood = 100;
	this.attackLevel = 1;
	this.defenseLevel = 1;
}
var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 1;
plane.defenseLevel = 7;
var data = {};
var clonePlane = Object.create(plane);
for(var key in clonePlane){
data[key]=clonePlane.key;
}
const server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type': 'application/json'});
	res.end(JSON.stringify(data));
})
server.listen(port,hostname,()=>{
	console.log('listening on localhost:3000')
})
