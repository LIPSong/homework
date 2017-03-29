(function () {
    var list = [
        {
            code:200,
            message:"成功",
            data:[
                {name:"小明",age:10},
                {name:"小亮",age:12},
                {name:"小红",age:15},
                {name:"小华",age:17}
            ]
        },
        {
            code:200,
            message:"成功",
            data:[
                {name:"小明1",age:10},
                {name:"小猫1",age:14},
                {name:"小白2",age:11},
                {name:"小猪3",age:16}
            ]
        }
    ];
    new Vue({
        el:"#container",
        data:{
            list:list
        }
    });
})();
<ul>
        <li v-for="obj in list">
            <ul>
                <li v-for="item in obj.data">
                    <h3 v-text="item.name"></h3>
                    <p v-text="item.age"></p>
                </li>
            </ul>
        </li>
    </ul>
	
    (function () {
	var list = [
	    {
		code: 200,
		message: '成功',
		data: [
		    {name: '小明', age: 10},
		    {name: '小亮', age: 12},
		    {name: '小红', age: 15},
		    {name: '小华', age: 17}
		]
	    },
	    {
		code: 200,
		message: '成功',
		data: [
		    {name: '小明1', age: 10},
		    {name: '小猫1', age: 14},
		    {name: '小白2', age: 11},
		    {name: '小猪3', age: 16}
		]
	    }
	];
	new Vue({
	    el: '#container',
	    data: {
		list: list
	    }
	});
    })();
    <ul>
	<li v-for="obj in list">
	    <ul>
		<li v-for="item in obj.data">
		    <h3 v-text="item.name"></h3>
		    <p v-text="item.age"></p>
		</li>
	    </ul>
	</li>
    </ul>;

