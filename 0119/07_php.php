<?php
/**
 * Created by PhpStorm.
 * User: sks
 * Date: 2017/1/18
 * Time: 16:56
 */

include "02_db.php";

//查询
$tongxues = db("SELECT * FROM tongxue");

//返回JSON内容
echo json_encode($tongxues);
