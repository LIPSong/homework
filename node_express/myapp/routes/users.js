/**
*@file users.js
*@author songliping
	*/
var DBManagerTools = require('../tools/DBManagerTool');
var express = require('express');
var router = express.Router();
var Alidayu = require('alidayu-node');
var sms = new Alidayu('23739992', '2fa374b88108e28930c482afd0a8cc60');

/* GET users listing. */
// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });
router.get('/login', function (req, res) {
    res.send('login success');
});
// 根据查询的内容，去查询匹配到的所有用户
router.get ("/searchAllUsers", function(req,res){
DBManagerTools.searchAllUsers(req.query.info).then(function(result){
res.send({
	code:2000,
	message:'查询成功',
	data:result
});
}).catch(function(error){
	res.send({
	code:3000,
	message:'数据库操作失败'})

});
})
// 短信验证接口
router.post('/verifyCode', function (req, res) {
    // 随机生成6位验证码
    verifyCode = Math.floor(Math.random() * 900000) + 100000;
    // verifyCode = '123456';
    // res.send(req.body);
    if (1 === 1 && req.body.phone) {
        var info = {
            sms_free_sign_name: '宋立平',
            sms_param: {
                code: verifyCode + '',
                product: '崔老师家教中心'
            },
            rec_num: req.body.phone,
            sms_template_code: 'SMS_60390526'
        };
        sms.smsSend(info, function (result) {
            if (result.alibaba_aliqin_fc_sms_num_send_response == null) {
                res.send({
                    code: 3007,
                    message: '验证码发送频繁'
                });
                return;
            }

            if (result.alibaba_aliqin_fc_sms_num_send_response.result.success) {
                res.send({code: 2000, message: '验证码发送成功!', verifyCode: verifyCode});
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
    if (verifyCode) {

        if (verifyCode != req.body.verifyCode) {

            res.send({
                code: 3006,
                message: '验证码有误'
            });

            return;
        }
    }
    else {
        //  提示用户未填写验证码

        res.send({
            code: 3005,
            message: '未填写验证码'
        });

        return;
    }
    if (req.body.username && req.body.phone) {
        DBManagerTools.addUser(req.body).then(function (result) {
            console.log(req.body);
            res.send({code: 2000, message: '注册成功', data: result});
        }).catch(function (error) {
            console.log(error);
            res.send({
                code: 3000,
                message: error.code == 'ER_DUP_ENTRY' ? '用户名或手机号已注册!' : '数据库操作失败'
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
// 登录接口
router.post('/login', function (req, res) {
    if (req.body.phone || req.body.username) {
        console.log(req.body);
        DBManagerTools.searchUser(req.body).then(function (result) {
            console.log(result);
            var success = {
                code: 2000,
                message: '登录成功',
                data: result[0]
            };
            var error = {
                code: 3008,
                message: '密码错误'
            };
            res.send(req.body.password == result[0].password ? success : error);
        }).catch(function (error) {
            console.log(error);

            res.send({
                code: 3000,
                message: '数据库操作失败'
            });
        });
    }

});












module.exports = router;
