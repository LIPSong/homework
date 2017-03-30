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
    .controller('RecorderWriteController', function ($scope, writeService, $ionicActionSheet, $ionicPopup, DBManager) {

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
            status: {
                message: '普通事件',
                statusNum: 1
            },
            public: {
                message: '私有',
                isPublic: false
            },
            location: {}
        };
        // 提醒时间

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
      DBManager.addData("INSERT INTO recoder ('title','des','alert_time','status','is_public','lat','lng','address','date','is_online','is_finish') VALUES(?,?,?,?,?,?,?,?,?,?,?);",[info.title,info.des,info.alertTime,info.status.statusNum,info.public.isPublic,info.location.point.lat,info.location.point.lng,info.location.address,date.getTime(),0,0]).then(function (result) {
        console.log(result);
      }).catch(function (error) {
        console.log(error);
      });
        }
        // 保存到云端
        function saveForOnline(info) {
            alert('云端');
            saveForOffline();
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
    });
