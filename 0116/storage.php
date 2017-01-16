<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>storage</title>
		<script>

		</script>
	</head>
	<body>
	  <select name="year" id="">
	  	<?php for($i=2010;$i<2016;$i++){?>
	  		<option value=""><?php echo $i;?></option>
	  	<?php }?>
	  </select>
    	   
      
	</body>
	<script>
		//保存数据到sessionStorage
		sessionStorage.setItem('key','value');
		
		//从sessionStorage获取数据
		var data = sessionStorage.getItem('key');
		
	</script>
</html>
