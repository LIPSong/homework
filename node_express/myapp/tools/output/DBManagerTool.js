/**
*@file DBManagerTool
*@author slp7756646@126.com
	*/
var DBManager = require('./DBManager');
var dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'secretary'
};
var dbManager = new DBManager(dbConfig);
function DBManagerTool() {
}
// 查询用户
DBManagerTool.searchUser = function (message) {
    var phone = message.phone ? message.phone : '';
    var name = message.username ? message.username : '';
    var sql = 'SELECT * FROM `user` WHERE `phone` = \'' + phone + '\' OR `username`=\'' + name + '\'';
    return dbManager.operation(sql);
};
// 添加用户
DBManagerTool.addUser = function (userInfo) {
    console.log(userInfo);
    var sql = 'INSERT INTO `user`(`username`, `password`, `phone`) VALUES (\'' + userInfo.username + '\',\'' + userInfo.password + '\',\'' + userInfo.phone + '\')';
    return dbManager.operation(sql);
};

module.exports = DBManagerTool;
