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
                            // 反地理编码成功之后，把坐标和位置信息传递到使用promise的地方
                            res({point: point, address: address});
                        });
                    }

                });

            });
            return promise;
        }
        this.alertTime = alertTime;
        this.status = status;
        this.getCurLocation = getCurLocation;
    });
