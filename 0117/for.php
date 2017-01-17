
		<form action="form-1.php" method="post">
	<lable>用户名
	  <input type="text" name="username"/>
	</lable>
	<lable>密码
	  <input type="password" name="password"/>
	</lable>
	<label for="">爱好
		<input type="checkbox" name="fav[0]" value="0"/>吃饭
		<input type="checkbox" name="fav[1]" value="1"/>睡觉
	</label>
	<input type="submit" name="register" value="注册" />
	<input type="hidden" name="action" value="addSighting" id="action">
</form>

