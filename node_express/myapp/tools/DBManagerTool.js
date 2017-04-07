var DBManager = require('./DBManager');
var dbConfig = {
	host:"localhost",
  user:"root",
  password:"123456",
  database:"secretary"
};
var dbManager = new DBManager(dbConfig);
function DBManagerTool() {}

// 添加用户
DBManagerTool.addUser = function (userInfo) {
var sql="INSERT INTO `user`(`username`, `password`, `phone`) VALUES ('"+userInfo.username+"','"+userInfo.password+"','"+userInfo.phone+"')";
return dbManager.operation(sql);
}
DBManagerTool.searchUser = function(){
var sql = "SELECT * FROM `user`";
dbManager.operation(sql).then(function(result){console.log(result)}).catch(function(error){console.log(error)})
}















module.exports = DBManagerTool;
