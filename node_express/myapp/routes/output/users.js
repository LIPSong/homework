/**
*@file users.js
*@author songliping
	*/
var DBManagerTools = require('../tools/DBManagerTool');
var express = require('express');
var router = express.Router();
var Alidayu = require('alidayu-node');
var sms = new Alidayu('23739992', '2fa374b88108e28930c482afd0a8cc60');
var verifyCode = 0;

/* GET users listing. */
// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });
router.get('/login', function (req, res) {
    res.send('login success');
});
// 短信验证接口
router.post('/verifyCode', function (req, res) {
    // res.send(req.body);
    if (1 === 1 && req.body.phone) {
        var info = {
            sms_free_sign_name: '宋立平',
            sms_param: {
                code: verifyCode + '',
                product: '崔老师'
            },
            rec_num: req.body.phone,
            sms_template_code: 'SMS_60390526'
        };
        sms.smsSend(info, function (result) {
            console.log(result);
            if (result.alibaba_aliqin_fc_sms_num_send_response.result.success) {
                res.send({code: 2000, success: 'send message success!'});
            }
            else {
                verifyCode = 0;
                res.send({code: 3004, message: '发送验证码失败'});
            }
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
    if (req.body.username && req.body.phone) {
        DBManagerTools.addUser(req.body).then(function (result) {
            console.log(result);
            res.send({code: 2000, message: '注册成功'});
        }).catch(function (error) {
            console.log(error);
            res.send({
                code: 3000,
                message: '数据库操作失败'
            });
        });
    }
    else {
        res.send({
            code: 3003,
            message: '未填写用户名或者手机号'
        });
    }

});
module.exports = router;
