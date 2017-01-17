<?php
/*
  $chengji =  ["yuwen"=>100,"shuxue"=>99,"yingyu"=>44];
  print_r($chengji);
  foreach($chengji as $k =>$v ){
     echo $k."=>".$v."\n";
}
 $name = ["1"=>"song","2"=>"zhang"];
 print_r($name);
 $arr = array_merge($chengji,$name);
 print_r($arr);
 */
 print_r($_GET);
 $shuzi = $_GET['shuzi'];
 echo $shuzi%2 === 0 ?"$shuzi 是偶数":"$shuzi 是奇数";

?>
