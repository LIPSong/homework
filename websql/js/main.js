/**
 * @file
 */
(function () {

    /**
    * 打开数据库
    * name 数据库的名字
    * version 数据库的版本
    * displayName 数据可显示的名字
    * estimatedSize 数据库的容量
    * creationCallback 操作完成之后的回调函数
    */

    var database = openDatabase('websql', 1.0, 'websql', 5 * 1024 * 1024, function (result) {
        console.log(result);
    });
    document.querySelector('#create-table').onclick = function () {
        createTable();
    };
    document.querySelector('#add-data-table').onclick = function () {
        add();
    };
    document.querySelector('#delete-data-table').onclick = function () {
        deleteData();
    };
    document.querySelector('#update-data-table').onclick = function () {
        updateData();
    };
    document.querySelector('#search-data-table').onclick = function () {
        searchData();
    };
    function createTable() {

        /**
         * 建表
         * callback：只要调用了都会去调用的回调函数
         * errorCallback:执行出现错误调用
         * successCallback:执行成功
         */
        var createTableSQL = 'CREATE TABLE recoder(\'id\', \'title\', \'des\')';
        database.transaction(function (transactionObj) {
            transactionObj.executeSql(createTableSQL);
        });
    }
    function add() {
        var addSQL = 'INSERT INTO recoder (\'id\',\'title\',\'des\') VALUES (1,\'会议记录\',\'大家今天需要开会\')';
        database.transaction(function (ts) {
            ts.executeSql(addSQL);
        });
    }
    function deleteData() {
        var deleteSQL = 'DELETE FROM recoder WHERE id=1';
        database.transaction(function (ts) {
            ts.executeSql(deleteSQL);
        });
    }
    function updateData() {
        var updateSQL = 'UPDATE recoder SET title=\'吃饭\' WHERE id=1';
        database.transaction(function (ts) {
            ts.executeSql(updateSQL);
        });
    }
    function searchData() {
        var searchSQL = 'SELECT * FROM recoder;';
        database.transaction(function (ts) {
            ts.executeSql(searchSQL, [], function (ts, result) {
                console.log(result.rows);
                var listView = document.querySelector('#result-content');
                var allhtml = '';
                for (var i = 0; i < result.rows.length; i++) {
                    var info = result.rows[i];
                    var item = '<li><h1>' + info.title + '</h1></li><p>' + info.des + '</p>';
                    allhtml += item;
                }
                listView.innerHTML = allhtml;
            });
        });
    }
})();
