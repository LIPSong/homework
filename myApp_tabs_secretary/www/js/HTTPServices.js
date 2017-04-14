angular.module("starter.HTTPServices",[])

.service("HTTPManager",function ($http, $httpParamSerializerJQLike) {
// 创建socket连接的方法
this.socketConnection = function () {
return new Promise(function (res, rej) {
var socket = io(HOST);
socket.on('connect', function () {
res(this);
});
socket.on('disconnect', function () {
rej('socket连接已断开');
});
});
};
// 发送内容
  this.send = function (eventName,message) {
    return new Promise(function (res,rej) {
      this.socketConnection().then(function (socket) {

        socket.emit(eventName,message,function () {
          res("发送成功");
        });

      }).catch(function (error) {
        rej(error);
      });
    }.bind(this));
  };
// 监听发送的消息
this.listen = function (eventName) {

    return new Promise(function (res,rej) {

      this.socketConnection().then(function (socket) {

        socket.on(eventName,function (message) {
          res(message);
        });

      }).catch(function (error) {
        rej(error);
      });

    }.bind(this));

  };

 this.get = function (url, param) {
      var paramStrings =[];
      for(key in param){
        paramStrings.push(key+"="+param[key])
      }

      return $http.get(url+'?'+paramStrings.join("&"))
   };
  this.post = function (url,param) {

    return $http({
      url:url,
      method:"POST",
//    data:param,
      headers:{
        "content-type":"application/x-www-form-urlencoded"
      },
//    transformRequest:function (data) {
//
//      var body = [];
//      for (key in data) {
//
//        var value = data[key];
//        var item = key+"="+encodeURIComponent(value);
//        body.push(item);
//      }
//
//      return body.join("&");
//
//    }
      data:$httpParamSerializerJQLike(param)

    });

  };

});
