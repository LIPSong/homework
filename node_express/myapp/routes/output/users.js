var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });
// router.get('/login', function (req,res) {
//  res.send('login success');
// });
// 短信验证接口
router.get('/verifyCode', function (req, res) {
    if (req.query.phone) {
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
    console.log(req.body);
    // res.send('hello i am back-end!');
    res.json({
        message: 'hello'
    });

});
