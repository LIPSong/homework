var googleMap = {
	show: function(){
		console.log('Begin to render a Google map')
		}	
	};
var baiduMap = {
	show: function(){
		console.log('Begin to render a Baidu map')
		}
	};
//var renderMap = function(type){
//	if(type === 'google'){
//		googleMap.show();
//	}else if(type === 'baidu'){
//		baiduMap.show()
//	}
//};
var renderMap = function(map){
	if(map.show instanceof Function){
		map.show();
	}
}
//renderMap('google');
//renderMap('baidu');
renderMap(googleMap);
renderMap(baiduMap);
var sosoMap = {
	show: function(){
		console.log('sosoMap');
	}
}
renderMap(sosoMap);
console.log('hello word')
