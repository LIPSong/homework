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
	 var getBannerOptions = new GetOptions();
		 getGoods(bannerUrl,getBannerOptions,parseBanner,'JSONP');
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
		 * 获取热卖区dom @example img a 并修改值
		 */
		 var GetGoodsOptions = {};
		 getGoods(getGoodsUrl,GetGoodsOptions,parseHot,'JSONP');
		 /**
		  * 
		  * @param {Object} data
		  */
		 function parseHot(data){
		 	var goodsItems = $('.goods-hot .item a');
		 	//循环取数据
		 	goodsItems.each(function(i){
		 		var imgSrc = JSON.parse(data[i][6])[0];
			 	var imgAlt = data[i][2];
			 	var price = data[i][4];
		 		var links = "details.html?goodsID=" + data[i].goodsID;
		 		$(this).attr('href',links);
		 		$(this).children('img').attr('alt',imgAlt);
		 		$(this).children('img').attr('src',imgSrc);
		 		$(this).children('.desc').html(imgAlt);
		 		$(this).children('.price').html(price);
		 	})
		 }
		 /**
		  * 
		  */
		 var searchGoodsUrl =  'http://datainfo.duapp.com/shopdata/selectGoodes.php';
		 var searchOptions = new SearchOptions();
		 searchOptions.selectText = '衬衫';
		 getGoods(searchGoodsUrl,searchOptions,parseSearchGoods,'JSONP');
		 console.log(searchOptions);
		 function parseSearchGoods(data){
		 	console.log(data);
		 }
		 
}()