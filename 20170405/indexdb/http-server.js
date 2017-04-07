/**
*@file node http server
*@author songliping
	*/
var HTTP = require('http');
var server = HTTP.createServer(function (request, response) {
    // request 客户端发送过来的请求
    // response 服务端发送给客户端的响应
    response.end("hello");	
	

});
// 监视端口
server.listen(3005);


