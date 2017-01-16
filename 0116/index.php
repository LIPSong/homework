<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>index</title>
	</head>
	<style>
		table,tr,td{
			border: 1px solid red;
		}
		td{
			width: 120px;
			height: 20px;
		}
		.pink{
			background-color: pink;
		}
	</style>
	<body>
		<table>
		  <?php for($i=0;$i<10;$i++){?>
		  <tr <?php if($i%2==0){echo "class='pink'";}?>>
		  	<td><?php echo $i;?></td>
		  	<td></td>
		  </tr>
		  <?php }?>
		 </table> 	
	  	<!--<?php
	  	  $names = array("加油","加油","加油","加油","加油","加油","加油","加油");
	  	  for($i=0;$i<count($names);$i++){
	  		if($i % 2 == 0){
	  			echo "<tr><td style='background-color: red'>{$names[$i]}</td></tr>";
	  		}
	  		else{
	  			echo "<tr><td style='background-color: blue'>{$names[$i]}</td></tr>";
	  		}
	  	  }	 
	  
	  	  for($i=1;$i<=9;$i++){
	  	  	for($j=1;$j<=$i;$j++){
	  	  	  echo $i.'*'.$j.'='.$i*$j.' ';
	  	  	}
	  	  	echo '<br/>';
	  	  }
	  	?>-->
	  </table>
	</body>
</html>
