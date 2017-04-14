/**
*
	* 轮询后端
	*/
//var express = require('express');
//var router = express.Router();

//发送
//router.post('/sendMessage', function (req, res) {
	// 在from 和to对应的chat这个表中添加一条记录
//res.send({
//	message:'插入数据库成功'
//});
//});

//接收
//router.post('/receiveMessage', function (req, res) {
	// 聊天信息的ID -> 查询数据库
//res.send({message:'查询到的结果'});
//});
// 封装socket.io的类
/**
	* server 通过 Node.js创建的HTTP服务
	*/
function Chat(server) {

// 创建socket.io 对象 需要传入HTTP服务对象
var io = require('socket.io');
var socket = io(server);
// 监听 socket的连接状态
socket.on('connection', function (result) {
// result 是连接好的socket对象
console.log('已链接上');
result.on('addFriendInvite', function(e){
console.log(e);   
});
});
socket.on('disconnect', function () {
console.log('连接已断开');
});
}


module.exports = Chat;

