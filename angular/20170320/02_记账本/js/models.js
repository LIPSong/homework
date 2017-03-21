(()=>{
	//定义一个book模型每次添加book对象的时候就创建一个新的对象
	//解决添加完内容之后所有内容都是变成相同内容
	function Book(_title,_price){
		this.title=_title;
		this.price = _price;
	}
	window.Book = Book;
})()