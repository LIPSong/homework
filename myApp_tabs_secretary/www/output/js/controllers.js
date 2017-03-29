angular.module('starter.controllers', [])
    .controller('RecorderWriteController', function ($scope, writeService) {

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
            isPublic: false,
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
                default:
            }
        };
        $scope.toSave = function () {
            // 保存到本地或者云端
            // 使用alertsheet
            if (this.writeInfo.title.length > 0 && this.writeInfo.des.length > 0) {
            }
            else {
                // 未录入标题或者内容
            }
        };
    });
