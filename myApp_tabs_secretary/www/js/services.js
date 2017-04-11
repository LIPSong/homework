angular.module('starter.services', [])
    .service('writeService', function () {
        // 提醒时间
        function alertTime() {
            var date = new Date();
            return date.getTime();
        }
        // 紧急状态
        // 0 1 2
        function status(s) {
            s = s >= 2 ? 0 : ++s;
            var info = {};
            switch (s) {
                case 0:
                    info.message = '紧急事件';
                    break;
                case 1:
                    info.message = '普通事件';
                    break;
                case 2:
                    info.message = '推迟事件';
                    break;
                default:
            }
            info.statusNum = s;
            return info;
        }
        // 获取用户位置
        function getCurLocation() {
            var promise = new Promise(function (res, reject) {
                var geo = new BMap.Geolocation();
                geo.getCurrentPosition(function (result) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        // 获得到定位的位置
                        var point = result.point;
                        var coder = new BMap.Geocoder();
                        coder.getLocation(point, function (rs) {
                            // 获得地址的对象
                            var addComp = rs.addressComponents;
                            var address = addComp.province + ' ' + addComp.city + ' ' + addComp.district + ' ' + addComp.street + ' ' + addComp.streetNumber;
                            //反地理编码成功之后，把坐标和位置信息传递到使用promise的地方
                            res({point:point,address:address});
                        });
                    }

                });

            });
            return promise;
        }
        this.alertTime = alertTime;
        this.status= status;
        this.getCurLocation = getCurLocation;
    })
    .service("DBManager",function () {
    		var self = this;
    		//打开数据库的方法
    		this.openDB = function (dbName,dbVersion) {
    			//打开数据库，得到数据库的对象
    			this.db = openDatabase(dbName,dbVersion,dbName,10*1024*1024);
    		};
    		this.createTable= function (sql) {
    			return new Promise(function(res,reject){
    				if (self.db) {
    					self.db.transaction(function(ts){
    						ts.executeSql(sql,[],function(trans,result){
    							res({
    								code:2000,
    								message:"建表成功",
    								data:result
    							});
    						},function(error){
    							reject({
    								code:2001,
    								message:"建表失败",
    								data:error
    							})
    						});
    					})
    				} else{
    					reject({code:3000,message:"请打开数据库"});	
    				}	
    			});
    		};
    		/*添加数据 插入数据到数据库
    		 * addData 插入数据到数据库
    		 * sql：string sql语句
    		 * vaules：array 插入的值数组
    		 */
    		this.addData = function (sql,values) {
    			return new Promise(function(res,reject){
    				if (self.db) {
    					self.db.transaction(function(ts){
    						ts.executeSql(sql,values,function(trans,result){
    							res({
    								code:2000,
    								message:"添加数据成功",
    								data:result
    							});
    						},function(error){
    							reject({
    								code:2002,
    								message:"添加数据失败",
    								data:error
    							});
    						})
    					})
    				} else{
    					reject({code:3000,message:"请打开数据库"});	
    				}
    			});
    		};
 this.updateData =function (sql,values) {
            return  new Promise(function (res,reject) {
                if(self.db){
                    self.db.transaction(function (ts) {
                      ts.executeSql(sql,values,function (trans,result) {
                        res({
                          code:2000,
                          message:"更新成功",
                          data: result
                        })
                      },function (error) {
                        reject({
                          code:2002,
                          message:"更新失败",
                          data: error
                        })
                      });
                    })
                }else{
                    reject({code:3000,message:"请打开数据库"});
                }
            });
      }; 
    		this.deleteData = function (sql) {
    			return new Promise(function(res,reject){
    				self.db.transaction(function(ts){
    					ts.executeSql(sql,[],function(trans,result){
    						res({
    							code:2000,
    							message:'删除成功',
    							data:result
    						});
    					},function(error){
    						reject({
    							code:2004,
    							message:'删除数据失败',
    							data:error
    						});
    					});
    				});
    			});
    		};
  		this.searchData = function (sql) {
    			return new Promise(function(res,reject){
    				if (self.db) {
    					self.db.transaction(function (ts) {
    						ts.executeSql(sql,[],function(trans,result){
    							res({
    								code:2000,
    								message:"查询成功",
    								data:result.rows
    							});
    						},function(error){
    							reject({
    								code:3000,
    								message:"查询数据失败",
    								data:error
    							});
    						});
    					});
    				} else{
    					reject({code:3000,message:"请打开数据库"});
    				}
    				
    			});
    		};
    })
    .service('timeTool',function(){
    		//时间戳是一个事件的标记
    		//xxxx年-xx月-xx日
    		this.YMD = function(timeStamp){
			//把时间戳转成日期对象
			var date = new Date(timeStamp);
var dateString = date.getFullYear()+"年-"+(date.getMonth()+1)+"月-"+date.getDate()+"日";
			console.log(dateString);
    			return dateString;
    		}
    		function returnDecimal(num) {
        return num>=10 ? num:"0"+num;
    }
//  xx:xx:xx
    this.hourMinuteSeconds = function (timeStamp) {

      var date = new Date(timeStamp);

      return returnDecimal(date.getHours())+":"+returnDecimal(date.getMinutes())+":"+returnDecimal(date.getSeconds());
    };
    this.amOrPm = function(timeStamp){
    	var date = new Date(timeStamp);
    	var hours = date.getHours();
    	var ampm = hours >= 12?'下午':'上午';
    	hours = hours>12?hours-12:hours;
    	return ampm+' '+hours+':'+date.getMinutes()+':'+date.getSeconds()+'';
    }
        //Am Pm  24/12
    		//周几
this.week = function (timeStamp) {
        var date = new Date(timeStamp);

        var weekNum = date.getDay();

        var list = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]

        return list[weekNum];
      }
    })
   .service('alertView', function ($ionicLoading, $timeout) {
   	this.showMessageForDelay = function (message, delay) {
   		$ionicLoading.show({
   			template:message
   		});
   		$timeout(function () {
   		$ionicLoading.hide();
   		}, delay)
   	}
   })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ;
