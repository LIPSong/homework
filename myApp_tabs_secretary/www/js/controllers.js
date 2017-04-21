angular.module('starter.controllers', [])
    .controller('tabController', function ($rootScope,DBManager,$ionicPlatform, $cordovaLocalNotification) {
        $ionicPlatform.ready(function () {
        	         var timeStamp = new Date();
      var date = new Date(timeStamp.getTime()+10*1000);

      var notInfo = {
        id:0,
        title:"hello not",
        text:"first not",
        data:{
          title:"有大奖",
          message:"快来加入《秘书》"
        },
        at:date
      };
      //schedule 添加本地推送
      $cordovaLocalNotification.schedule(notInfo).then(function (result) {console.log(result)}).catch(function(error){console.log(error)});
      $rootScope.$on('$cordovaLocalNotification:trigger',
        function (event, notification, state) {
          console.log("通知已被触发",notification);
        }); 
    });
        // 打开数据库
        DBManager.openDB('recoders', 1.0);
        // 创建表
        DBManager.createTable('CREATE TABLE recoder (\'title\' varchar(255) NOT NULL,\'des\' NOT NULL,\'alert_time\',\'status\',\'is_public\',\'lat\',\'lng\',\'address\',\'date\',\'is_online\',\'is_finish\');').then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    })
    .controller('RecorderWriteController', function ($scope, writeService, $ionicActionSheet, $ionicPopup, DBManager, $ionicNavBarDelegate, $stateParams, $ionicHistory, $rootScope, timeTool,alertView,HTTPManager) {
        // 根据type在视图上面去区分进入的是哪一种界面
        $scope.type = $stateParams.type;

        /**
         *  writeInfo 记录录入数据的数据模型
         * 	title 标题
         *  des 内容
         *  alertTime 提醒时间精确到毫秒的时间戳
         *	status 紧急状态 0非常紧急 1普通 2不紧急
         * isPublic 是否公开
         * location 定：lat long 经纬度的值和地址address 
         */
        $scope.writeInfo = {
            title: '',
            des: '',
            alertTime: 0,
            showTime: 0,
            status: {
                message: '普通事件',
                statusNum: 1
            },
            public: {
                message: '私有',
                isPublic: false
            },
            location: {
                address: '定位',
                point: {}
            }
        };
        if ($scope.type != '001') {

            // 获取传过来的内容
            var info = $rootScope.recoderList[parseInt($stateParams.type, 10)];
            $scope.writeInfo.title = info.title;
            $scope.writeInfo.des = info.des;
            $scope.writeInfo.status = writeService.status(info.status - 1);

            var isPub = info.is_public == 'true' ? true : false;
            $scope.writeInfo.public = {
                message: isPub ? '公开' : '私有',
                isPublic: isPub
            };
            $scope.writeInfo.location = {
                address: info.address,
                point: {
                    lat: info.lat,
                    lng: info.lng
                }
            };
            var map = new Map('showLocationMapView', $scope.writeInfo.location.point, 10, true);
            map.movePromise.then(function (point) {
                $scope.writeInfo.location.point = {
                    lat: point.lat,
                    lng: point.lng
                };
            });
            //        var map = new BMap.Map('showLocationMapView');
            //        var point = new BMap.Point(info.lng,info.lat);
            //        map.centerAndZoom(point,10);

        }

        /**
         * 
         * @param {Object} type
         * addEvent 给录入页面按钮添加统一事件
         * 0 提醒时间
         * 1 状态
         * 2 定位 
         * 3 是否公开
         */
        $scope.addEvent = function (type) {
            console.log(type);
            switch (type) {
                case 0:
                    this.writeInfo.alertTime = writeService.alertTime();
                    this.writeInfo.showTime = timeTool.amOrPm(this.writeInfo.alertTime);
                    break;
                case 1:
                    this.writeInfo.status = writeService.status(this.writeInfo.status.statusNum);
                    break;
                case 2:
                    this.writeInfo.location = writeService.getCurLocation().then(function (info) {
                        $scope.$apply(function () {
                            $scope.writeInfo.location = info;
                        });

                    });
                    break;
                case 3:
                    this.writeInfo.public.message = this.writeInfo.public.isPublic ? '公开' : '私有';
                default:
            }
        };
        // 保存到本地
        function saveForOffline(info) {
            var date = new Date();
            var addSql = 'INSERT INTO recoder (\'title\',\'des\',\'alert_time\',\'status\',\'is_public\',\'lat\',\'lng\',\'address\',\'date\') VALUES(?,?,?,?,?,?,?,?,?);';
            var updateSql = 'UPDATE recoder SET title=?,des=?,alert_time=?,status=?,is_public=?,lat=?,lng=?,address=? WHERE date=?';
            var funName = ($scope.type == '001') ? DBManager.addData : DBManager.updateData;
            var sql = ($scope.type == '001') ? addSql : updateSql;
            funName(sql, [info.title, info.des, info.alertTime, info.status.statusNum, info.public.isPublic, info.location.point.lat, info.location.point.lng, info.location.address, $scope.type == '001' ? date.getTime() : $rootScope.recoderList[parseInt($stateParams.type, 10)].date]).then(function (result) {
                console.log(result);
            }).catch(function (error) {
                console.log(error);
            });
        }
        // 保存到云端
        function saveForOnline(info) {
            // todo:判断是否登录
            if (!window.localStorage.getItem(IS_LOGIN)) {
            	    alertView.showMessageForDelay('请登录后保存', 2000)
            	    return;
            }
             //录入的数据中 没有用户ID  需要把登录时候的ID添加到这个对象中

      $scope.writeInfo.userID = parseInt(window.localStorage.getItem(USER_ID));

            // todo: 调用保存到云端的接口
            HTTPManager.post(HOST+ADD_RECODER,$scope.writeInfo).then(function (result) {
            	    result.data.code == 2000?$ionicHistory.goBack():alertView.showMessageForDelay(result.data.message, 2000);
            }).catch(function (error) {
            	    alertView.showMessageForDelay(error.data.message,2000);
            });
            // 保存到云端的时候保存到本地一份
            saveForOffline(info);
        }
        $scope.toSave = function (info) {
            // 保存到本地或者云端
            // 使用alertsheet
            if (this.writeInfo.title.length > 0 && this.writeInfo.des.length > 0) {
                $ionicActionSheet.show({
                    buttons: [
                        {
                            text: '保存到本地'
                        },
                        {
                            text: '保存到云端'
                        }
                    ],
                    titleText: '保存记录',
                    cancelText: '取消',
                    buttonClicked: function (index) {
                        console.log(index);
                        index ? saveForOnline(info) : saveForOffline(info);
                        $ionicHistory.goBack();
                        return true;
                    }
                });
            }
            else {
                // 未录入标题或者内容
                $ionicPopup.alert({
                    title: '温馨提示',
                    template: '请填写标题或内容',
                    buttons: [{
                        text: 'OK',
                        type: 'button-energized'
                    }]
                });
            }
        };
    })
    // 首页控制器
    .controller('recorderController', function ($scope, DBManager, $ionicLoading, $timeout, timeTool, $ionicListDelegate, $rootScope,HTTPManager) {
        function loadData() {
              // 等待视图
            $ionicLoading.show({
                template: '正在努力加载中……'
            });
            $ionicLoading.hide();
             //  所有的控制器都可以访问recoderList这个变量
            $rootScope.recoderList = [];
            $scope.recorders = $rootScope.recoderList;
             HTTPManager.get(HOST+SEARCH_RECODER,{user_id:window.localStorage.getItem(USER_ID)}).then(function (result) {

        console.log(result);

        if (result.data.code==2000){
          //todo:
          $scope.recorders = result.data.data;
          $rootScope.recoderList = $scope.recorders;
            $ionicLoading.hide();

            $scope.$broadcast('scroll.refreshComplete');

        }

      }).catch(function (error) {
          //todo:
          console.log(error);
      });

//          DBManager.searchData('SELECT*FROM recoder').then(function (result) {
//              $scope.$apply(function () {
//                  for (var i = 0; i < result.data.length; i++) {
//                      $scope.recorders.push(result.data[i]);
//                      if ($scope.recorders[i]) {
//                          $scope.recorders[i].alert_time = timeTool.amOrPm(result.data[i].alert_time);
//                      }
//
//                  }
//              });
//              $ionicLoading.hide();
//              $scope.$broadcast('scroll.refreshComplete');
//              console.log($scope.recorders);
//          }).catch(function (error) {
//              $ionicLoading.hide();
//              $ionicLoading.show({
//                  template: error.message
//              });
//              $timeout(function () {
//                  $ionicLoading.hide();
//              }, 2000);
//          });
        }
        loadData();
        $scope.reload = function () {
            loadData();
        };
        $scope.deleteItem = function (info) {
            $ionicLoading.show({
                template: '正在删除中...'
            });
              HTTPManager.get(HOST+DELETE_RECODER,{recoderID:info.recoder_id}).then(function (result) {

        if (result.data.code==2000){
          $ionicLoading.hide();
          $scope.recorders.splice($scope.recorders.indexOf(info),1);
        }

      }).catch(function (error) {
        $ionicLoading.show({
          template:error.message
        });

        $timeout(function () {
          $ionicLoading.hide();
        },2000);
      });

//          DBManager.deleteData('DELETE FROM recoder WHERE date=' + info.date).then(function (result) {
//              $ionicListDelegate.closeOptionButtons();
//              $ionicLoading.hide();
//
//              // 获得要删除元素的下标在数组中删除，并且在数据库中删除
//              var deleteIndex = $scope.recorders.indexOf(info);
//              $scope.recorders.splice(deleteIndex, 1);
//
//          }).catch(function (error) {
//              $ionicLoading.show({
//                  template: error.message
//              });
//              $timeout(function () {
//                  $ionicLoading.hide();
//              }, 2000);
//
//          });
        };
    })
    //垃圾桶控制器
    .controller('trashBoxController', function ($scope, $ionicListDelegate,HTTPManager,alertView,$ionicHistory,$ionicPopup) {
    //删除记录的数组
    $scope.removedRecoders = [];
    //清空所有数据
    $scope.clearAll = function () {
    	$ionicPopup.alert({
      title: '温馨提示',
      template: '是否清空垃圾箱',
      buttons:[{
        text:"必须",
        type:"button-energized",
        onTap:function () {

          HTTPManager.get(HOST+CLEAR_ALL_RECODER,{userID:window.localStorage.getItem(USER_ID)}).then(function (result) {
            if (result.data.code == 2000){
              //如果 还原单条数据成功
              //需要把 垃圾箱数组中 这条数据删除
              $scope.reomvedRecoders = [];

              alertView.showMessageForDelay(result.data.message,2000);
            }
          }).catch(function (error) {
            alertView.showMessageForDelay(error.data.message,2000);
          });
        }
      },{
        text:"取消",
        type:"button-energized"
      }]
    });
    }
    //还原数据的函数
    $scope.restoreRecoder = function (info) {
    function restoreItem(info) {}
    	$ionicPopup.alert({
      title: '温馨提示',
      template: '是否还原',
      buttons:[{
        text:"还原",
        type:"button-energized",
        onTap: function restoreItem() {
        	    console.log(info);
        	    HTTPManager.get(HOST+RESTORE_RECODER, {recoderID:info.recoder_id}).then(function(result){
        	    if (result.data.code == 2000) {
        	    	// 如果还原单条数据成功
        	    	// 需要把垃圾箱数组中这条数据删除
        	    	$scope.removedRecoders.splice($scope.removedRecoders.indexOf(info),1);
        	    	alertView.showMessageForDelay(result.data.message,2000);
        	    }
        	    }).catch(function (error) {
        	    	alertView.showMessageForDelay(error.data.message,2000);
        	    });
        }
      },{
        text:"取消",
        type:"button-energized"
      }]
    }).then(function (result) {
      console.log(result);
    });

    };
    //清空某条记录的函数
    $scope.deleteItem = function (info) {
    HTTPManager.get(HOST+CLEAR_RECODER,{recoderID:info.recoder_id}).then(function (result) {
    if (result.data.code == 2000) {
    	console.log(result);
    	$scope.removedRecoders.splice($scope.removedRecoders.indexOf(info),1);
    	alertView.showMessageForDelay(result.data.message,2000);

    }
    }).catch(function (error) {
    	alertView.showMessageForDelay(result.data.message,2000);
    });
    };
    // 下拉刷新加载数据的函数
    $scope.reload = function () {
    	    loadData();
    };
    // 加载数据的函数
    function loadData() {
    	// 每次重新加载 青空之前的数据
    	$scope.removedRecoders = [];
    	HTTPManager.get(HOST+SEARCH_TRASH_RECODER,{user_id:window.localStorage.getItem(USER_ID)}).then(function (result) {
    		if (result.data.code == 2000) {
    			console.log(result);
    			$scope.removedRecoders = result.data.data;
    			$scope.$broadcast('scroll.refreshComplete');
    		}
    	}).catch(function(error){
    		alertView.showMessageForDelay(error.data.message,2000);
    	});
    }
    
    
    
    })
    // 设置控制器 
    .controller('settingController', function ($scope, HTTPManager, $rootScope) {
        // 	$scope.gotoRegister = function () {
        // 		HTTPManager.post(HOST+REGISTER,$scope.userVerifyInfo).then(function(result){console.log(result.data)});
        // 	};
        // 	//发往后台用户验证信息数据模型
        // 	$scope.userVerifyInfo = {
        // 		username:'Jhon',
        // 		phone:'',
        // 		verifyCode:'123456'
        // 	}
        // 	//定义方法用来获取验证码
        // 	$scope.gotoVerifyCode = function (info) {
        // 		HTTPManager.post(HOST+VERIFICATION_CODE,info).then(function(result){console.log(result.data)});
        // 	}
        // 读取用户名登录状态
        $rootScope.isLogin = window.localStorage.getItem(IS_LOGIN);
//      $rootScope.isLogin = 0;
        // 如果登录了 显示用户名
        if ($rootScope.isLogin) {
            $rootScope.username = window.localStorage.getItem(USER_NAME);
        }

    })
    .controller('loginController', function ($rootScope,$scope, alertView,HTTPManager,$ionicHistory) {
      	$scope.userInfo = {};
      	var reg = '/^1[0-9]{10}$/';
        $scope.toLogin = function (info) {
      	    info.password = md5(sha1(info.password+"secretary"));
        	    HTTPManager.post(HOST+LOGIN,info).then(function(result){
        	    	console.log(result);
            if (result.data.code == 2000) {
            // 保存登录状态	
            // 保存用户名到本地
            window.localStorage.setItem(IS_LOGIN, 1);
            window.localStorage.setItem(USER_NAME, result.data.data.username);
             window.localStorage.setItem(USER_ID,result.data.data.user_id);
            $rootScope.isLogin = window.localStorage.getItem(IS_LOGIN);
            $rootScope.username = window.localStorage.getItem(USER_NAME);
            $ionicHistory.goBack();	
            }else {
            	alertView.showMessageForDelay(result.data.message,2000)
            }
        	    }).catch(function(error){
        	        console.log(error);	
        	        alertView.showMessageForDelay(error.data.message,2000);	
        	    });
        }
    })
    .controller('registerController', function ($scope, $interval, HTTPManager,alertView, $ionicHistory, $timeout) {
        $scope.registerInfo = {};
        $scope.codeStatus = '获取验证码';
        $scope.codeStatusDisable = false;
        $scope.isFinish = false;
        $scope.getVerifyCode = function () {
            HTTPManager.post(HOST + GET_VERIFICATION_CODE, {
                phone: $scope.registerInfo.phone
            }).then(function (result) {
                console.log(result.data);               
                alertView.showMessageForDelay(result.data.message, 2000);
                $scope.code = result.data.verifyCode;
            }).catch(function (error) {
                console.log(error.data);                
                alertView.showMessageForDelay(error.data.message, 2000);
            });
            $scope.codeStatusDisable = true;
            var time = 5;
            var timer = $interval(function () {
                $scope.codeStatus = --time + '秒后重试';
                if (time === 0) {
                    $interval.cancel(timer);
                    $scope.codeStatus = '获取验证码';
                    $scope.codeStatusDisable = false;
                }

            }
                , 1000);
        };
       $scope.toRegister=function (info) {
      if($scope.code==$scope.registerInfo.verifyCode){
      	info.password = md5(sha1(info.password+"secretary"));
        HTTPManager.post(HOST+REGISTER,info).then(function (result) {
        	  console.log(result.data);
        	  if(result.data.code == '2000'){
           $scope.registerInfo={};
           alertView.showMessageForDelay(result.data.message,2000);
           $timeout($ionicHistory.goBack(), 3000);
        	  }else{
          alertView.showMessageForDelay(result.data.message,2000);
        	  }
        }).catch(function (error) {
        	console.log('error:'+error);
        	
          alertView.showMessageForDelay(error.data.message,2000);
        });
      }else{
        alertView.showMessageForDelay("验证码错误",2000);
      }
     }; 
    })
.controller('friendsController',function ($scope) {})    
.controller('searchFriendController',function ($scope,$ionicPopup, HTTPManager, alertView) {
//	var socket = io(HOST);
//  socket.on("connect",function () {
//    console.log("已连接上...");
//
//    this.emit("addFriendInvite",{userID:8,friendID:10,message:"你好，加个好友"},function (e) {
//      console.log(e);
//    });
//
//    this.on("addFriendResponse",function (e) {
//      console.log(e);
//    });

//    });
        $scope.message = '';	
	$scope.friends = [];
	$scope.searchMessage = '';
	$scope.showSendView = function (friendInfo) {
            $ionicPopup.show({
        template: '<input type="message" ng-model="message">',
        title: '添加好友',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<b>添加</b>',
            type: 'button-positive',
            onTap: function(e) {
		    var sendMessage = {
	          userID:window.localStorage.getItem(USER_ID),
		    friendID:friendInfo.user_id,
		    message:this.scope.message
	    };
		    HTTPManager.send(ADD_FRIEND_INVITE,sendMessage).then(function (result) {
		   alertView.showMessageForDelay(result,2000); 
		    }).catch(function (error) {
		   alertView.showMessageForDelay(error,2000); 
		    });
            }
          },
        ]
      }); 
	};
	$scope.searchFriend = function () {
	HTTPManager.get(HOST+SEARCH_ALL_USERS,{info:$scope.searchMessage}).then(function (result){
		$scope.friends = result.data.data;
	alertView.showMessageForDelay(result.data.message,2000);	
	}).catch(function (error) {
		
	alertView.showMessageForDelay(error.data.message,2000);	
	});
	};
})
.controller('circleController', function ($interval,$scope, HTTPManager) {

})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ;
