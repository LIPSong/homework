/**
*@file DBManager
*@author slp7756646@126.com
	*/

(function () {

    /**
    	* DBManager
    	*
    	* @param {string} name name
    	* @param {string} version version
    	* @classdesc Create a Database Manager
    	* @class DBManager
    	*/
    function DBManager(name, version) {
        this.openDB(name, version);
    }
    DBManager.prototype.openDB = function (name, version) {
        var request = indexedDB.open(name, version);
        request.onerror = function (e) {};
        // 打开数据库成功的时候只调用一次
        var self = this;
        request.onsuccess = function (e) {
            self.db = this.result;
		console.log(this.result);
        };
        request.onupgradeneeded = function (e) {
            console.log('更新', request.result);
            self.db = this.result;
		console.log(this.result);
            self.createTable('user', ['name', 'phone', 'age']);
        };
    };
    DBManager.prototype.createTable = function (osName, indexs) {
        var os = this.db.createObjectStore(osName, {
            keyPath: indexs[0]
        });
        for (var i = 0; i < indexs.length; i++) {
            os.createIndex(indexs[i], indexs[i]);
        }
    };

    /**
    *addObject 添加数据
    *osName 表的名字
    *ibject 要添加的内容
	* @descrition addObject
		* @param {string} osName osName
		* @param {Object} object object
    	*/

    DBManager.prototype.addObject = function (osName, object) {
        var os = this.db.transaction([osName], 'readwrite').objectStore(osName);
        var request = os.add(object);
        request.onerror = function (e) {
            console.log(e);
        };
        request.onsuccess = function (e) {
            console.log('添加成功', e);
        };
    };

    /**
    *updateObject 添加数据
    *osName 表的名字
    *ibject 要添加的内容
	* @descrition updateObject
		* @param {string} osName osName
		* @param {Object} object object
    	*/

    DBManager.prototype.updateObject = function (osName, object) {
        var os = this.db.transaction(osName, 'readwrite').objectStore(osName);
        var request = os.put(object);
        request.onerror = function (e) {
            console.log(e);
        };
        request.onsuccess = function (e) {
            console.log('添加成功', e);
        };
    };
    DBManager.prototype.searchObject = function (osName, searchMessage) {
        var os = this.db.transaction('').objectStore();
        var request = os.get();
        request.onerror = function (event) {
            console.log(event);
        };
        request.onsuccess = function (event) {
            console.log(event.target.result);
        };
    };

    window.DBManager = DBManager;
})();
