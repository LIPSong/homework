name 王树冬  stark  git :wsdo

angular 表达式 {{}}  	ng-bind
ng-init  
ng-href:对应的值{{}} ng-href = {{url}}
链式引用：app.name 和 app    .name 是一样的
定义其他模块名的时候，应用程序入口的模块名.其他模块名angular.module("app.controllers",[]).controller('homeControllser',function($scope,$apply注入服务){})在调用控制器函数的时候需要传控制器的名字和回调函数会得到angular中的服务，只要是以$开头的都是angular中的内置服务，在自定angular服务的时候不要以$开始，$scope用于连接视图和模型的变量只要是定义在$scope上面的变量都可以被视图找到,$scope只在当前的控制器起作用
控制器使用步骤：1.创建应用程序的入口模块angular.module('app',['注入的模块名'])
2.创建控制器模块->在html中引入js并且需要在入口模块中注入控制这个模块
控制器监控$scope.$watch('',function(newValue,oldValue){console.log(newValue,oldValue)}):检测数据模型的改变
app.js:angular.module('app',['app.controllers'])
controllers.js:var app = angular.module('app.controllers');
app.controller('homeController',callback)控制器不要去继承控制器，angular存在就不用写了，控制器之间通过事件进行交互
ng-app : 声明应用程序的指令，一个程序中必须要有该指令
ng-app：可以认为是应用程序的入口 一般情况下都写在html、body，用于开发单一应用页面的应用程序，只有一个完整文档结构的页面其他全部都是view
如果在一个文档中使用多个ng-app只有第一个ng-app起作用
ng-bind：可以绑定数据模型不可以在输入控件里面去绑定，在输入控件里面绑定数据模型使用ng-model

ng-model：声明数据双向绑定的指令，说明将表单的数据绑定到应用程序中。

ng-bind：声明绑定数据

module:
	通过angular.module 方法
		该方法有两个参数
			第一个参数表示程序的名称
			第二个参数表示依赖的服务
控制器
	ng-controller 是用来控制应用程序的
	app 的 controller 方法
		两个参数
			第一个参数表示控制器的名称
			第二个参数表示控制器的构造函数
		参数是你需要的数据，需要什么可以传递什么，这样在构造函数中就可以使用它，如果没有传递就无法使用
	```
		app.controller('main',function($scope){
			// console.log(this);
			$scope.stark = "hello world";
			$scope.sex  = "1";
		})
	```

控制器的作用域
	$scope 用来实现与视图连接，是它们之间的桥梁，在$scope上定义数据，可以用在视图上，那么在视图上绑定的数据可以在$scope上获取
	$scope ：是通过原型式继承实现的，所以子作用域会继承父作用域中的变量，但是我们可以为子作用域添加变量来覆盖父作用域中的变量	

定义事件
	ng-事件名称，比如click事件 ng-click="clickBtn()"
	clickBtn方法定义在作用域中，在dom通过添加ng-click属性实现绑定事件，注意这个事件方法名称后面一定要加上括号（）
clickBtn
	它的执行作用域是$scope,当前作用域

元素的显示隐藏
	ng-show 表示该元素的指令
	值为true显示该元素
	值为false隐藏该元素
	ng-hide 表示该元素的指令
	值为false显示该元素
	值为true隐藏该元素

	里面可以写简单的运算
	<div ng-show="1 == 2"></div>
            <div ng-show="stark"></div>


ng-repeat
	遍历dom
filter 
	currency  格式化货币
	json 格式化json 
	toUpperCase  匹配大写
	```
		//匹配单词开头字母是大写  notice： 只支持英文 中文和其它字符 直接返回
		$scope.firstCharIsUpper = function(color){
			return 	color[0] == color[0].toUpperCase();
		}
	```

limitTo 过滤器
	截取过滤器
	参数表示截取的长度
	这个过滤器不仅可以截取字符串，还可以截取数组
	<div>{{data | limitTo : 6 }}</div>
	$scope.data = 'thisisstark';
		$scope.msg = 'ThisIsRed';
		$scope.color = ['red', 'Blue', 'Yellow', 'Green', 'orange'];
字符串大小写
	uppercase 将字符串转换成大写，注意 case 中c 是小写
	lowercase 将字符串转化成小写， 注意 case 中的c 是小写
	uppercase 这个过滤器和 toUpperCase() 效果是一样的 ，但是angular官方建议使用过滤器的方式
	不建议使用这种表达是的方式 toUpperCase()

## number 过滤器
	是一种数字类型数据过滤器
	参数表示截取的小数位置
	该过滤是将数字以每三位分隔渲染的
	如果不传递参数则默认保留三位小数，并且四舍五入
	```
		<div>{{num}}</div>
		<div>{{num | number}}</div>
		<div>{{num | number : 5}}</div>
	```
orderBy
	是对数组进行排序的过滤器
	第一个参数表示数组中每个成员排序的属性名称
	第二个参数表示正序还是倒序
		默认值为false 
		false 从小到大 
		true 从大到小
	```
	{{arr | orderBy : 'age' }}
	```