var DBManagerTools = require('../tools/DBManagerTool');
var express = require('express');
var router = express.Router();

router.post('/addRecoder', function (req, res) {
DBManagerTools.addRecoder(req.body);
});
router.post('/deleteRecoder', function (req, res) {});
router.post('/updateRecoder', function (req, res) {});
router.post('/searchRecoder', function (req, res) {});

module.exports = router;
