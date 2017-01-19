<?php
//连接数据库，很高兴的告诉你PHP和MySQL是好兄弟，只需要一行命令，就能链接数据库！
//phpstudy选手的默认的用户名是root，密码是root
//$con就是一个变量，表示一次连接
$con = mysqli_connect("127.0.0.1","root","", "frontend");

//选择链接哪个库？
//mysql_select_db($con);
//更改数据操作字符集
mysqli_query($con, "SET NAMES UTF8");

//执行SQL语句，就把检索结果放到了$result变量中
$result = mysqli_query($con, "SELECT * FROM tongxue");
//循环读取
while($row = mysqli_fetch_array($result)){
    print_r($row);
    echo $row['id'];
    echo $row['name'];
    echo $row['age'];
    echo $row['sex'];
    echo "<br />";
}
//关闭数据库
mysqli_close($con);
?>

