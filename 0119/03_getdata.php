<?php
/**
 * Created by PhpStorm.
 * User: sks
 * Date: 2017/1/18
 * Time: 10:14
 */
include "02_db.php";

//查询
$tongxues = db("SELECT * FROM tongxue");
foreach($tongxues as $row) {
    print_r($row);
}

