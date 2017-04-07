angular.module('starter.controllers', [])
    .controller('tabController', function (DBManager) {
        // 打开数据库
        DBManager.openDB('recoders', 1.0);
        // 创建表
        DBManager.createTable('CREATE TABLE recoder (\'title\' varchar(255) NOT NULL,\'des\' NOT NULL,\'alert_time\',\'status\',\'is_public\',\'lat\',\'lng\',\'address\',\'date\',\'is_online\',\'is_finish\');').then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    })
    .controller('RecorderWriteController', function ($scope, writeService, $ionicActionSheet, $ionicPopup, DBManager,$ionicNavBarDelegate,$stateParams,$ionicHistory,$rootScope,timeTool) {
    	console.log($rootScope.recoderList);

    	console.log($stateParams);

	//根据type在视图上面去区分进入的是哪一种界面
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
            showTime:0,
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
        if ($scope.type!='001') {

        		//获取传过来的内容
        		var info = $rootScope.recoderList[parseInt($stateParams.type)];
			$scope.writeInfo.title=info.title;
          $scope.writeInfo.des=info.des;
          $scope.writeInfo.status=writeService.
          status(info.status-1);

		  var isPub = info.is_public == 'true'?true:false;
          $scope.writeInfo.public={
            message:isPub?"公开":"私有",
            isPublic:isPub
          };
          $scope.writeInfo.location={
            address:info.address,
            point:{
              lat:info.lat,
              lng:info.lng
            }
          };
          var map=new Map('showLocationMapView',$scope.writeInfo.location.point,10,true);
          map.movePromise.then(function(point){
          	$scope.writeInfo.location.point={
          		lat:point.lat,
          		lng:point.lng
          	}
          })
//        var map = new BMap.Map('showLocationMapView');
//        var point = new BMap.Point(info.lng,info.lat);
//        map.centerAndZoom(point,10);

        };

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
                   this.writeInfo.showTime =  timeTool.amOrPm(this.writeInfo.alertTime);
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
            var addSql = "INSERT INTO recoder (\'title\',\'des\',\'alert_time\',\'status\',\'is_public\',\'lat\',\'lng\',\'address\',\'date\') VALUES(?,?,?,?,?,?,?,?,?);" ;
 var updateSql ="UPDATE recoder SET title=?,des=?,alert_time=?,status=?,is_public=?,lat=?,lng=?,address=? WHERE date=?";
            var funName = ($scope.type=='001')?DBManager.addData:DBManager.updateData;
            var sql = ($scope.type=='001')?addSql:updateSql;
            funName(sql, [info.title, info.des, info.alertTime, info.status.statusNum, info.public.isPublic, info.location.point.lat, info.location.point.lng, info.location.address,$scope.type=='001'?date.getTime():$rootScope.recoderList[parseInt($stateParams.type)].date]).then(function (result) {
                console.log(result);
            }).catch(function (error) {
                console.log(error);
            });
        }
        // 保存到云端
        function saveForOnline(info) {
            alert('云端');
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
    .controller('recorderController', function ($scope, DBManager, $ionicLoading, $timeout,timeTool,$ionicListDelegate,$rootScope) {
        function loadData() {
            // 等待视图
            $ionicLoading.show({
                template: '正在努力加载中……'
            });
            //所有的控制器都可以访问recoderList这个变量
            $rootScope.recoderList = [];
            $scope.recorders = $rootScope.recoderList;
            DBManager.searchData('SELECT*FROM recoder').then(function (result) {
                $scope.$apply(function () {
                    for (var i = 0; i < result.data.length; i++) {
                        $scope.recorders.push(result.data[i]);
                        if($scope.recorders[i]){
                        $scope.recorders[i].alert_time = timeTool.amOrPm(result.data[i].alert_time);
                    }
					}
                });
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                console.log($scope.recorders);
            }).catch(function (error) {
                $ionicLoading.hide();
                $ionicLoading.show({
                    template: error.message
                });
                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
            });
        }
        loadData();
        $scope.reload = function () {
            loadData();
        };
        $scope.deleteItem = function(info){
        		$ionicLoading.show({
        			template:'正在删除中...'
        		});
        		DBManager.deleteData("DELETE FROM recoder WHERE date="+info.date).then(function(result){
        			$ionicListDelegate.closeOptionButtons();
        			$ionicLoading.hide();
        			
         		//获得要删除元素的下标在数组中删除，并且在数据库中删除
        		var deleteIndex = $scope.recorders.indexOf(info);
        		$scope.recorders.splice(deleteIndex,1);
        		        			
        		}).catch(function(error){
        				$ionicLoading.show({
        					template:error.message
        				});
        				$timeout(function(){
        					$ionicLoading.hide();
        				},2000);

        		});
        };
    })
   //设置控制器 
   .controller('settingController', function ($scope, HTTPManager) {
   	$scope.gotoRegister = function () {
   		HTTPManager.post(HOST+REGISTER,{name:'Jhon'}).then(function(result){console.log(result)});
   	};
   })
    
    ;
