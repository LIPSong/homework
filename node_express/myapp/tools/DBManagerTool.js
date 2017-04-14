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
/** 搜索用户
* info
	* phone username
	*/
DBManagerTool.searchAllUsers = function (info) {
	var sql = "SELECT * FROM `user` WHERE username LIKE '%"+info+"%'";
	return dbManager.operation(sql);
}
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
DBManagerTool.deleteRecoder = function (id) {
    var sql = "UPDATE `recoder` SET  `is_remove`=1 WHERE `recoder_id`="+id;	
return dbManager.operation(sql);
}
/**
	* searchRecoder:查询
	* isRemove 查询是否是删除的记录0未删除
	* 1删除（查询显示在垃圾桶中的记录）
	* userID 用户ID 区分是哪一个用户
	*/
DBManagerTool.searchRecoder = function (is_removed,info) {
    var sql = "SELECT * FROM `recoder` WHERE is_remove="+is_removed+" and user_id="+info;
	console.log(sql);
return dbManager.operation(sql);
}
DBManagerTool.updateRecoder = function (info) {
var sql = '';
return dbManager.operation(sql);
};
/**
* restoreRecoder 还原单条数据的数据库操作方法
	* id 记录的id recoder_id
	*/
DBManagerTool.restoreRecoder = function (id){
    var sql = "UPDATE `recoder` SET  `is_remove`=0 WHERE `recoder_id`="+id;	
return dbManager.operation(sql);
}
/**
	*
	*clearRecoder 从数据库清空单条数据的方法
	*/
DBManagerTool.clearRecoder = function (recoderID) {
var sql = "DELETE FROM `recoder` WHERE recoder_id="+recoderID; 
return dbManager.operation(sql);
}
// 清除垃圾箱内所有的数据
DBManagerTool.clearAllOfTrash = function (userID) {
var sql = "DELETE FROM `recoder` WHERE is_remove=1 AND user_id="+userID; 
	return dbManager.operation(sql);
};
module.exports = DBManagerTool;
