/**
 * @author songliping <slp7756646@126.com> 
 * @description liangcang index.js 
 * @version 1.1
 */
!function(){
	var bannerUrl = 'http://datainfo.duapp.com/shopdata/getBanner.php';//轮播接口
	var getGoodsUrl = 'http://datainfo.duapp.com/shopdata/getGoods.php';//获取商品数据
	
	/**
	 * @description 获取轮播数据 
	 */
	var getBannerOptions = new GetGoodsOptions();
		 getGoods(bannerUrl,getBannerOptions,parseBanner);
	 /**
	  * @description 处理首页轮播
	  */
	 function parseBanner(bannerData){
	 	var data =$(bannerData);
	 	/**
	 	 * 获取轮播数组
	 	 */
	 	var swiperWrapper = $(".swiper-wrapper")[0];
	 	var str = "";
	 	data.each(function(i){
	 		//获取并设置轮播a链接参数
	 		var bannerUrl = "details.html?goodsID=" + bannerData[i].goodsID;
	 		var imgUrl = JSON.parse(data[i][3])[0];
	 		str += "<div class='swiper-slide'><a href="+bannerUrl+"><img src="+imgUrl+" alt="+data[i][2]+" /></a></div>"			
	 	})
	 	swiperWrapper.innerHTML = str;
	 	   swiper.destroy(false);
	 	   swiper.init();
	 }
	
	/**
	 * 商品列表
	 */
	function getGoods(url,options,callback){
	 	$.ajax({
	 		data: options,
	 		url: url,
	 		method: 'POST',
	 		dataType: 'JSONP',
	 		success: function(data){
	 			callback(data);
	 		}
	 	});
	 }
		/**
		 * 获取展示区dom @example img a 并修改值
		 */
		 getGoods(getGoodsUrl,GetGoodsOptions,parseGoods);
		 function parseGoods(data){
		 	var goodsItems = $('.goods-item').children('a');
		 	//循环取数据
		 	goodsItems.each(function(i){
		 		var imgSrc = JSON.parse(data[i][6])[0];
			 	var imgAlt = data[i][2]
		 		var links = "details.html?goodsID=" + data[i].goodsID;
		 		$(this).attr('href',links);
		 		$(this).children('img').attr('alt',imgAlt);
		 		$(this).children('img').attr('src',imgSrc);
		 	})
		 }
		/**
		 * @constructor 请求商品时传入后台参数
		 */
		function GetGoodsOptions(classID,goodsID,pageCode,lineumber){
			this.classID = classID || "";
			this.goodsID = goodsID || "";
			this.pageCode = pageCode || "";
			this.linenumber = lineumber || "";
		}
		var GetGoodsOptions = new GetGoodsOptions();

	
	










}()