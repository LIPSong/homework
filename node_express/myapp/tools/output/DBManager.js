/**
*@file  database manager
*@author songliping
	*/
var mysql = require('mysql');
function DBManager(dbConfig) {
    this.connectDB(dbConfig);
}
DBManager.prototype.connectDB = function (dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
};

DBManager.prototype.operation = function (sql) {
    return new Promise(function (res, rej) {
        this.connection.query(sql, function (error, result) {
            if (error) {
                rej(error);
            }
            else {
                res(result);
            }
        });
    }.bind(this));
};
module.exports = DBManager;
