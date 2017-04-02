(function(){
	window.onload = function (){
		/**
		 * @description 创建地图的类 
		 * @param {Object} _mark 地图容器，id类型的选择器名字
		 * @param {Object} _point 经纬度对象{lng:1111,lat:1111}
		 * @param {Object} zoom 初始的缩放比例
		 * @param {Object} isShowPoint 是否显示_point 的位置
		 */
		function Map(_mark,_point,_zoom,isShowPoint){
			this.map = new BMap.Map(_mark);
			var point = new BMap.Point(_point.lng,_point.lat);
			this.map.centerAndZoom(point,_zoom);
			if (isShowPoint) {
				this.movePromise= this.showMarker(point); 
			}
		}
		/**
		 * @description 创建大头针方法
		 * @param {Object} point
		 */
		Map.prototype.showMarker = function(point){
			return new Promise(function(res){
				var marker = new BMap.Marker(point);
			marker.enableDragging();
			this.map.addOverlay(marker);
			marker.addEventListener('dragend',function(e){
				res(e.point);
			});
			}.bind(this))
					};
		window.Map = Map;
}
})()