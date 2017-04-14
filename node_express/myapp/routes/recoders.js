var DBManagerTools = require('../tools/DBManagerTool');
var express = require('express');
var router = express.Router();

router.post('/addRecoder', function (req, res) {
    console.log(req.body);
    if (req.body) {
        DBManagerTools.addRecoder(req.body).then(function (result) {
            res.send({
                code:2000,
                message:"添加數據成功"
            });
        }).catch(function (error) {
            res.send({
                code:3000,
                message:"數據庫操作失敗"
            });
        });
    }
});
router.get('/deleteRecoder', function (req, res) {
    if (req.query.recoderID){

        DBManagerTools.deleteRecoder(req.query.recoderID).then(function (result) {
            console.log(result);
            if (result){
                res.send({
                    code:2000,
                    message:"数据已移入垃圾箱"
                });
            }
        }).catch(function () {
            res.send({
                code:3000,
                message:"数据库操作失败"
            });
        });
    }else {
        res.send({
            code:3009,
            message:"请传入要删除的信息ID"
        });
    }

});
router.post('/updateRecoder', function (req, res) {});
router.get('/searchRecoder', function (req, res) {
	console.log(req.query);
    //search Recoder
	//需要传两个参数
	// 第一个参数是 是否删除
	// 用户ID
    DBManagerTools.searchRecoder(0,req.query.user_id).then(function (result) {
        console.log(result);
        res.send({
            code:2000,
            message:"搜索成功",
            data:result
        });
    }).catch(function () {
        res.send({
            code:3000,
            message:"數據庫操作失敗"
        });
    });
});
router.get('/searchRemovedRecoder',function(req, res){
	//需要传两个参数
	// 第一个参数是 是否删除
	// 用户ID
	console.log(req.query);
    DBManagerTools.searchRecoder(1,req.query.user_id).then(function (result) {
        console.log(result);
        res.send({
            code:2000,
            message:"搜索成功",
            data:result
        });
    }).catch(function () {
        res.send({
            code:3000,
            message:"數據庫操作失敗"
        });
    });
});
// 还原单挑记录
router.get('/restoreRecoder', function (req,res) {
    DBManagerTools.restoreRecoder(req.query.recoderID).then(function(result){
	   if(result){
		   res.send({
		    code:2000,
                    message:'还原数据成功'
		   });
	   } 
    }).catch(function(error){
    res.send({
	    code:3000,
	    message:'数据库操作失败'
    });
    });
})
 //删除单条数据 
   router.get('/clearRecoder', function (req, res) {
   DBManagerTools.clearRecoder(req.query.recoderID).then(function(result){ 
   if (result) {
   res.send({
           code:2000,
           message:'清除数据成功'
   });
   }
   }).catch(function (error) {
   res.send({
           code:3000,
           message:'数据库操作失败'
   });
   });
   });

//清空垃圾箱内所有数据
router.get('/clearAllOfTrash',function (req,res){
DBManagerTools.clearAllOfTrash(req.query.userID).then(function(result){
   if (result) {
   res.send({
           code:2000,
           message:'垃圾箱清除成功'
   });
   }

}).catch(function (error) {
   res.send({
           code:3000,
           message:'数据库操作失败'
   });
   });
   });












module.exports = router;
