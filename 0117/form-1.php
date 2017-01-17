<?php
  /*print_r($_GET);
  echo '<br/>';
  
  print_r($_POST);
  echo "<br/>";
  */
  $query = "SELECT * FROM `tongxue`";
  function db_connection($query){
  	$con = mysqli_connect('localhost','root','123456','fronted');
  	if(!$con){
      die("连接错误".mysqli_connect_error());		
  	}
  	mysqli_query($con,"set names 'utf8'");
  	return mysqli_query($con,$query);
  }
  $result = db_connection($query);
  while($row = mysqli_fetch_assoc($result)){
  	$name = $row['name'];
  	$age = $row['age'];
    echo "<br/>名字是".$name."，"."年龄是".$age."岁"."<br/>";
  }
  //print_r($classmates);
?>