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
// 录入相关
DBManagerTool.addRecoder = function (info) {

    console.log(info['location[address]']);

    info.userID = parseInt(info.userID);
    var isPublic = info['public[isPublic]']?info['public[isPublic]']:0;
    var statusNum = info['status[statusNum]']?info['status[statusNum]']:0;
    var lat = info['location[point][lat]']?info['location[point][lat]']:0;
    var lng = info['location[point][lng]']?info['location[point][lng]']:0;

    var sql = "INSERT INTO `recoder`(`user_id`, `is_public`, `title`, `des`, `alert_time`, `status`, `lat`, `lng`, `address`) VALUES ("+info.userID+","+isPublic+",'"+info.title+"','"+info.des+"','"+info.alertTime+"',"+statusNum+","+lat+","+lng+",'"+info['location[address]']+"');";

    console.log(sql);
    return dbManager.operation(sql);
};
DBManagerTool.deleteRecoder = function (info) {
var sql = '';
return dbManager.operation(sql);
}
DBManagerTool.searchRecoder = function (info) {
var sql = '';
return dbManager.operation(sql);
}
DBManagerTool.updateRecoder = function (info) {
var sql = '';
return dbManager.operation(sql);
}


module.exports = DBManagerTool;
