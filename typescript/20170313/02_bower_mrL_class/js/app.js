(()=>{
	class App{
		constructor(mark){
			var config = {
				el:mark,
				componets:{
					"book-list": listView
				},
				data: {
					list:[{title:"title",des:"water"}]
				}
			};
			new Vue(config);
		}
	}
	new App("#app");
})()