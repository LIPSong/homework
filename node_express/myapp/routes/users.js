/**
*@file users.js
*@author songliping
	*/
var DBManagerTools = require('../tools/DBManagerTool');	
var express = require('express');
var router = express.Router();
var Alidayu = require('alidayu-node');
var sms = new Alidayu('23739992','2fa374b88108e28930c482afd0a8cc60');
var verifyCode = '110119';
/* GET users listing. */
// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });
 router.get('/login', function (req,res) {
  res.send('login success');
});
// 短信验证接口
router.get('/verifyCode', function (req, res) {
    if (1==1||req.query.phone) {
var info = {
        sms_free_sign_name:'宋立平',
        sms_param:{
          code:"123456",
          product:"韩老师"},
    rec_num:'15264253513',
    sms_template_code:'SMS_60390526'
    };	    
	    sms.smsSend(info, function (result) {
	    console.log(result);
	    });
    }
    else {
        res.send({
            code: 3002,
            message: '请传入手机号或者检查参数key是否正确'
        });
    }
});
// 注册的接口
router.post('/register', function (req, res, next) {
if(req.body.username&&req.body.phone){
DBManagerTools.addUser(req.body).then(function(result){
console.log(result);
res.send({code:2000,message:'注册成功'});
}).catch(function(error){console.log(error);
res.send({code:3000,
	message:'数据库操作失败'
});
})

}else{
res.send({code:3003,
message:'未填写用户名或者手机号'
});
}




});
module.exports = router;
