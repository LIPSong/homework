<?php
/**
命令行使用数据库的步骤：
1 mysql -uroot -p
2 use db
3 select
 */

//1 连接数据库，参数有 host, username, password
$link = mysqli_connect('localhost', 'root', '123456', "fronted");
if (!$link) {
    die('连接数据库失败');
}

//设置编码
mysqli_set_charset($link, 'utf8');

//3
function db($sql) {
    global $link;
    $res = mysqli_query($link, $sql);//查询语句返回结果集

    if (strstr(strtolower($sql), 'select')) {//查询
        $result = array();
        while($row = mysqli_fetch_assoc($res)) {
            $result[] = $row;
        }
        return $result;
    } else {//增删改操作
        return $res;
    }
}

function closedb() {
    global $link;
    mysqli_close($link);
}

function getInsertId() {
    global $link;
    return mysqli_insert_id($link);
}