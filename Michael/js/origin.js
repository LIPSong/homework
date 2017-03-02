var GOODS_ID = 256210;
var GOODS_NAME = "缅甸/加拉帕戈斯有机咖啡/烫金杯/铜盒 新年礼盒";
//        var TYPE_NAME ="数量";
//        var TYPE_ID ="7";
//        var ATTR_ID ="3";
//        var ATTR_NAME ="套装";
var PRICE = "518.00";
var GOODS_SKU_SN = '';
var base_script = "i";

//              var TYPE_ID = [];
//            var TYPE_NAME = [];
//               var ATTR_ID = [];
//            var ATTR_NAME = [];
//            jQuery(".sku_type_ids").each(function(){
//        alert('1111');
//        var TYPE_ID = jQuery(this).val();
//                var TYPE_NAME = jQuery("#sku_type_name_"+type_id).val();
//                var ATTR_ID = jQuery("#sku_attr_id_"+type_id).val();
//                var ATTR_NAME = jQuery("#sku_attr_name_"+type_id).val();
//            });
jQuery(document).ready(function() {
	//默认首项
	//defaultGoods()
	getTheDefaltGoods()

	jQuery(".colorSku li").bind('click', colorSkuChk);
	jQuery(".textSku li").bind('click', txtSkuChk);
	jQuery("#canBuy").bind('click', chooseSku);
	jQuery("#addCart").bind('click', chooseSku);
	// 数量增减并判断库存
	jQuery('.minus').click(function() {
		if(parseInt(jQuery('.nums').html()) != 1) {
			jQuery('.nums').html(parseInt(jQuery('.nums').html()) - 1);
			checkGoodsAmount();
		}
	});
	jQuery('.plus').click(function() {
		jQuery('.nums').html(parseInt(jQuery('.nums').html()) + 1);
		checkGoodsAmount();
	});

});
window.onscroll = buyListener;

function buyListener() {
	var deviceH = jQuery(window).height();
	var skuConH = jQuery('.skuInfo').height();
	var bodyH = jQuery('body').height()
	var curTop = jQuery('html').scrollTop() || jQuery('body').scrollTop();
	var skuTop = jQuery('.skuInfo').offset().top;

	if(skuConH < deviceH) {
		skuTop = bodyH - deviceH - skuConH;
	}

	if(curTop > 230 && curTop < 580) {
		jQuery("#addCart").unbind('click').bind('click', addCart).html('<img src="http://7qn7hi.com1.z0.glb.clouddn.com/ware/orig/2/23/23436.png" style="width:10%;vertical-align:middle"/> &nbsp;&nbsp加入购物车');
		jQuery("#shu").html('丨');
		jQuery("#canBuy").unbind('click').bind('click', buySubmit).html('<label></label>确定购买');
	} else {
		jQuery("#addCart").unbind('click').bind('click', chooseSku).html('<img src="http://7qn7hi.com1.z0.glb.clouddn.com/ware/orig/2/23/23436.png" style="width:10%;vertical-align:middle"/> &nbsp;&nbsp加入购物车');
		jQuery("#shu").html('丨');
		jQuery("#canBuy").unbind('click').bind('click', chooseSku).html('<label></label>立即购买');
	}
}

//默认首项
function defaultGoods() {
	jQuery('.colorSku li:first').addClass('chk');
	jQuery('.textSku li:first').addClass('chkT');
	choseGoodsAttrs(jQuery('.colorSku li:first'));
	choseGoodsAttrs(jQuery('.textSku li:first'));
}

//查询默认库存不为空的数据
function getTheDefaltGoods(callback) {
	var is_checked = false;
	var colorConObj = jQuery(".colorSku");
	var sizeConObj = jQuery(".textSku");
	var type_ids = [];
	var attr_ids = [];
	if(colorConObj.length == 1 && sizeConObj.length == 1) {
		jQuery(".colorSku  li").each(function() {
			type_ids = [];
			attr_ids = [];
			if(is_checked) return false;
			type_ids.push(jQuery(this).attr('type_id'));
			attr_ids.push(jQuery(this).attr('attr_id'));
			choseGoodsAttrs(this)
			jQuery(".textSku li").each(function() {
				type_ids.push(jQuery(this).attr('type_id'));
				attr_ids.push(jQuery(this).attr('attr_id'));
				if(defaltGoodsCallback(type_ids, attr_ids)) {
					choseGoodsAttrs(this)
					is_checked = true;
					return false;
				}
				type_ids.pop()
				attr_ids.pop()
			});
		});
	} else if(colorConObj.length > 0 && sizeConObj.length == 2) {
		jQuery(".colorSku  li").each(function() {
			if(is_checked) return false;
			type_ids = [];
			attr_ids = [];
			type_ids.push(jQuery(this).attr('type_id'));
			attr_ids.push(jQuery(this).attr('attr_id'));
			choseGoodsAttrs(this)
			jQuery(".textSku li").each(function() {
				type_ids.push(jQuery(this).attr('type_id'));
				attr_ids.push(jQuery(this).attr('attr_id'));
				if(defaltGoodsCallback(type_ids, attr_ids)) {
					choseGoodsAttrs(this)
					is_checked = true;
					return false;
				}
				type_ids.pop()
				attr_ids.pop()
			});
		});
	} else if(colorConObj.length == 1 && sizeConObj.length == 0) {
		jQuery(".colorSku  li").each(function(index) {
			type_ids = [];
			attr_ids = [];
			type_ids.push(jQuery(this).attr('type_id'));
			attr_ids.push(jQuery(this).attr('attr_id'));
			if(defaltGoodsCallback(type_ids, attr_ids)) {
				choseGoodsAttrs(this)
				is_checked = true;
				return false;
			}
		});
	} else if(colorConObj.length == 0 && sizeConObj.length == 1) {
		jQuery(".textSku li").each(function() {
			type_ids = [];
			attr_ids = [];
			type_ids.push(jQuery(this).attr('type_id'));
			attr_ids.push(jQuery(this).attr('attr_id'));
			if(defaltGoodsCallback(type_ids, attr_ids)) {
				choseGoodsAttrs(this)
				is_checked = true;
				return false;
			}
		});
	} else if(colorConObj.length == 0 && sizeConObj.length > 1) {
		jQuery(".textSku li").each(function() {
			type_ids = [];
			attr_ids = [];
			type_ids.push(jQuery(this).attr('type_id'));
			attr_ids.push(jQuery(this).attr('attr_id'));
			if(1) {
				choseGoodsAttrs(this)
				is_checked = true;
				//return false;
			}
		});
	}

	//如果以上条件都不满足，则还是取第一个
	if(is_checked == false) {
		defaultGoods();
	}
}

function defaltGoodsCallback(type_ids, attr_ids) {
	var flag = false;
	jQuery.ajaxSetup({ async: false });
	jQuery.getJSON('/' + base_script + '/goods/?act=checkGoodsAmount&goods_id=' + GOODS_ID + '&type_keys=' + type_ids.join(',') + '&attr_keys=' + attr_ids.join(','), function(data) {
		if(data.amount > 0) flag = true;
	});
	return flag;
}

// 颜色尺码点击加边框及给隐藏input赋值,以及判断库存相应值
function colorSkuChk() {
	jQuery(".colorSku li").removeClass('chk');
	jQuery(this).addClass('chk');
	choseGoodsAttrs(this);
	checkGoodsAmount();
}

function txtSkuChk() {
	jQuery(".textSku li").removeClass('chkT');
	jQuery(this).addClass('chkT');
	choseGoodsAttrs(this);
	checkGoodsAmount();
}
// 点击确定购买页面滚动
function chooseSku() {
	// jQuery('body').scrollTop(jQuery('.skuInfo').offset().top);
	jQuery('html,body').animate({ scrollTop: jQuery('.skuInfo').offset().top - 270 }, 500);
	jQuery("#addCrat").html('<img src="http://7qn7hi.com1.z0.glb.clouddn.com/ware/orig/2/23/23436.png" style="width:10%;vertical-align:middle"/>&nbsp;&nbsp加入购物车');
	jQuery("#shu").html('丨');
	jQuery("#canBuy").html('<label></label>确定购买');
}

function buySubmit() {
	//            if(is_login == 0){
	//                var ua = navigator.userAgent.toLowerCase();
	//                var isWeixin = ua.indexOf('micromessenger') != -1;
	//                 if (!isWeixin) {
	//
	//                    window.location.href="/i/login/";
	//                }else{
	var goodsAmount = parseInt(jQuery("#goodsAmount").html()); //要购买商品数量
	window.location.href = "/" + base_script + "/mob/pay/?goods_id=" + GOODS_ID + '&goods_sku_sn=' + GOODS_SKU_SN + '&amount=' + goodsAmount;
	//                }
	//            }else{
	//                var goodsAmount = parseInt(jQuery("#goodsAmount").html()); //要购买商品数量
	//                window.location.href="/"+base_script+"/mob/pay/?goods_id="+GOODS_ID+'&goods_sku_sn='+GOODS_SKU_SN+'&amount='+goodsAmount;
	//            }
	//

}

// 点击改变隐藏input值得函数
function choseGoodsAttrs(obj) {
	var type_id = jQuery(obj).attr('type_id');
	var type_name = jQuery(obj).attr('type_name');
	var attr_id = jQuery(obj).attr('attr_id');
	var attr_name = jQuery(obj).attr('attr_name');
	if(jQuery.trim(jQuery(obj).parent().attr('class')) == "textSku") {
		jQuery(".goodsAttr" + type_id).removeClass('chkT');
		jQuery(obj).addClass('chkT');
	} else {
		jQuery(".goodsAttr" + type_id).removeClass('chk');
		jQuery(obj).addClass('chk');
	}

	jQuery("#sku_attr_name_" + type_id).val(attr_name);
	jQuery("#sku_attr_id_" + type_id).val(attr_id);

	checkGoodsAmount();
}
// 检测库存
function checkGoodsAmount() {

	jQuery.ajaxSetup({ async: false });
	var attrLen = jQuery(".sku_attr_names").length; //商品属性长度
	if(attrLen == 0) return; //如果商品没有商品属性
	var isChecked = true;
	var type_ids = [];
	var type_names = [];
	var attr_ids = [];
	var attr_names = [];
	var chkLen = 0;
	jQuery(".sku_type_ids").each(function() {
		var type_id = jQuery(this).val();
		var type_name = jQuery("#sku_type_name_" + type_id).val();
		var attr_id = jQuery("#sku_attr_id_" + type_id).val();
		var attr_name = jQuery("#sku_attr_name_" + type_id).val();
		type_ids.push(type_id);
		type_names.push(type_name);
		attr_ids.push(attr_id);
		attr_names.push(attr_name);
		if(attr_id != '') {
			chkLen++;
		}
	});

	//alert('checkGoodsAmount1');
	var isCanBuy = false; //是否可购买
	var goodsAmount = parseInt(jQuery("#goodsAmount").html()); //要购买商品数量
	if(chkLen == attrLen) {
		//alert('begin get');
		var url_get = '/i/goods/?act=checkGoodsAmount&goods_id=' + GOODS_ID + '&type_keys=' + type_ids.join(',') + '&attr_keys=' + attr_ids.join(',');
		//alert(url_get);

		/*
		jQuery.ajax({
		             type: "get",
		             url: url_get,
		             success: function(data){
		                alert(data);
		                //alert('get the return data');
		                },
		               error: function(XMLHttpRequest, textStatus, errorThrown) {
		                   var str_err = "XMLHttpRequest.status:"+XMLHttpRequest.status+";XMLHttpRequest.readyState:"+XMLHttpRequest.readyState+";textStatus:"+textStatus;
		                        alert(str_err);
		                    }
		         });
		*/

		var req; // 定义变量，用来创建xmlhttprequest对象
		function createReq(url) {
			//var url = "ajax.aspx"; //要请求的服务端地址
			if(window.XMLHttpRequest) {
				req = new XMLHttpRequest();
			} else if(window.ActiveXObject) {
				req = new ActiveXObject("Microsoft.XMLHttp"); //IE(6.0及以下版本)浏览器用activexobject对象创建,
				//如果用户浏览器禁用了ActiveX,可能会失败
			}
			if(req) //对象创建成功
			{
				req.open("GET", url, true); //与服务端建立连接(请求方式post或get，地址,true表示异步)
				req.onreadystatechange = callback; //指定回调函数
				req.send(url); //发送请求

			}
		}

		createReq(url_get);

		function callback() {
			//alert(req.readyState);

			if(req.readyState == 4) {
				/*
				if (req.status == 200) {
				    Display();
				}
				else {
				    alert("服务端返回状态" + req.statusText)
				}
				*/
				//alert(req.responseText);
				set_status(req.responseText);

			}
			/*
			else {
			    document.getElementById("myTime").innerHTML = "数据加载中";
			}
			*/
		}

		function set_status(data_str) {
			var data = JSON.parse(data_str);
			var new_price = data.price;
			var discount_price = data.discount_price;
			// console.log(data.goods_sku_sn);

			if(discount_price > 0) {
				jQuery("#curPriceTxt").html(data.discount_price);
				jQuery("#shopPriceTxt").show().html(new_price);
			} else {
				jQuery("#curPriceTxt").html(new_price);
				jQuery("#shopPriceTxt").hide();
			}
			GOODS_SKU_SN = data.goods_sku_sn;
			if(data.amount > 0 && goodsAmount <= data.amount) {
				isCanBuy = true;
				jQuery('#addCart').show().html('<img src="http://7qn7hi.com1.z0.glb.clouddn.com/ware/orig/2/23/23436.png" style="width:10%;vertical-align:middle"/>&nbsp;&nbsp加入购物车');
				jQuery("#shu").show().html('丨');
				jQuery('#canBuy').show().html("<label></label>确定购买");
				jQuery('#cantBuy').hide();
			} else {
				if(data.amount > 0 && goodsAmount > data.amount) {
					jQuery('#canBuy').hide();
					jQuery('#cantBuy').show().html("库存不足");
				} else {
					jQuery('#canBuy').hide();
					jQuery('#cantBuy').show().html("已售罄，即将到货");
					jQuery('#cantBuy').css({ "width": "100%", "margin-left": "0", "z-index": "9999999999" });
				}
			}
		}

		/*
		 jQuery.getJSON(url_get,function(data){
		     //alert('return goods amount');
		     var new_price = data.price;
		     var discount_price = data.discount_price;
		     // console.log(data.goods_sku_sn);

		     if(discount_price>0){
		         jQuery("#curPriceTxt").html(data.discount_price);
		         jQuery("#shopPriceTxt").show().html(new_price);
		     }else{
		         jQuery("#curPriceTxt").html(new_price);
		         jQuery("#shopPriceTxt").hide() ;
		     }
		     GOODS_SKU_SN = data.goods_sku_sn;
		     if(data.amount>0&&goodsAmount<=data.amount){
		         isCanBuy = true;
		         jQuery('#addCart').show().html('<img src="http://7qn7hi.com1.z0.glb.clouddn.com/ware/orig/2/23/23436.png" style="width:10%;vertical-align:middle"/>&nbsp;&nbsp加入购物车');
		         jQuery("#shu").show().html('丨');
		         jQuery('#canBuy').show().html("<label></label>确定购买");
		         jQuery('#cantBuy').hide();
		     }else{
		         if(data.amount>0&&goodsAmount>data.amount){
		             jQuery('#canBuy').hide();
		             jQuery('#cantBuy').show().html("库存不足");
		         }else{
		             jQuery('#canBuy').hide();
		             jQuery('#cantBuy').show().html("已售罄，即将到货");
		             jQuery('#cantBuy').css({"width":"100%","margin-left":"0","z-index": "9999999999"});
		         }
		     }
		 });
		 */

	}
	return isCanBuy;
}

/*
 *设置购物车中的商品数量
 */

function refresh_cart_num() {
	//alert('begin refresh');
	/*
			             jQuery.getJSON('/i/cart?act=num', '',function(data){

			                 document.getElementById('global_cart_num').innerHTML = data.global_cart_num;
			             });
                         */

	var url_num = '/i/cart?act=num';
	var req3; // 定义变量，用来创建xmlhttprequest对象
	function createReq3(url) {
		//var url = "ajax.aspx"; //要请求的服务端地址
		if(window.XMLHttpRequest) {
			req3 = new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			req3 = new ActiveXObject("Microsoft.XMLHttp"); //IE(6.0及以下版本)浏览器用activexobject对象创建,
			//如果用户浏览器禁用了ActiveX,可能会失败
		}
		if(req3) //对象创建成功
		{
			req3.open("GET", url, true); //与服务端建立连接(请求方式post或get，地址,true表示异步)
			req3.onreadystatechange = callback3; //指定回调函数
			req3.send(url); //发送请求

		}
	}
	//alert(url_num);
	createReq3(url_num);

	function callback3() {
		//alert(req2.readyState);
		if(req3.readyState == 4) {
			//go_add_cart(req3.responseText);
			var data = JSON.parse(req3.responseText);
			document.getElementById('global_cart_num').innerHTML = data.global_cart_num;
		}
	}

}

function addCart(obj) {
	var type_ids = [];
	var type_names = [];
	var attr_ids = [];
	var attr_names = [];
	jQuery(".sku_type_ids").each(function() {
		var type_id = jQuery(this).val();
		var type_name = jQuery("#sku_type_name_" + type_id).val();
		var attr_id = jQuery("#sku_attr_id_" + type_id).val();
		var attr_name = jQuery("#sku_attr_name_" + type_id).val();
		type_ids.push(type_id);
		type_names.push(type_name);
		attr_ids.push(attr_id);
		attr_names.push(attr_name);
	});

	//var url_cart = '/'+base_script+'/goods/?act=checkGoodsAmount&goods_id='+GOODS_ID+'&type_keys='+type_ids.join(',')+'&attr_keys='+attr_ids.join(',');
	var goodsAmount = parseInt(jQuery("#goodsAmount").html());
	var dest_goods_sku_sn2 = GOODS_SKU_SN.replace(/0/, "L");
	var dest_goods_sku_sn = dest_goods_sku_sn2.replace(/1/, "Y");
	var url_cart = "/" + base_script + "/shoppingcar/?act=addCart&from=wap&optType=addCartBtn&goods_id=" + GOODS_ID + '&goods_sku_sn=' + dest_goods_sku_sn + '&amount=' + goodsAmount + '&goods_name=' + GOODS_NAME + '&type_names=' + type_names + '&type_ids=' + type_ids + '&attr_ids=' + attr_ids + '&attr_names=' + attr_names + '&shop_price=' + PRICE;

	function go_add_cart(data_str) {
		var data = JSON.parse(data_str);
		if(is_login != 0) {
			if(data.rs == "true") {
				if(data.isswt == 1) {
					alert('加入购物车成功！');
					refresh_cart_num();
				}
			} else {
				alert(data.msg);
			}
		} else {
			//                        alert('请先登录后再进行操作！');
			//判断是否在微信浏览器中打开
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			if(!isWeixin) {
				//window.location.href="/i/mob_login?act=mobile&gourl=/"+ base_script + "/goods/?id=" + GOODS_ID;
				var gorul = "/" + base_script + "/goods/?opt=addcart&id=" + GOODS_ID + "&sku=" + GOODS_SKU_SN;
				gorul = encodeURIComponent(gorul);
				history.replaceState(null, "", "/i/mob_login?act=mobile&gourl=" + gorul);
				window.location.reload();
			} else {
				//window.location.href="/i/weixin?act=access&gourl=/" + base_script + "/goods/?id=" + GOODS_ID;

				var gorul = "/" + base_script + "/goods/?opt=addcart&id=" + GOODS_ID + "&sku=" + GOODS_SKU_SN;
				gorul = encodeURIComponent(gorul);
				history.replaceState(null, "", "/i/mob_login?act=mobile&gourl=" + gorul);
				window.location.reload();
			}
		}
	}

	var req2; // 定义变量，用来创建xmlhttprequest对象
	function createReq2(url) {
		//var url = "ajax.aspx"; //要请求的服务端地址
		if(window.XMLHttpRequest) {
			req2 = new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			req2 = new ActiveXObject("Microsoft.XMLHttp"); //IE(6.0及以下版本)浏览器用activexobject对象创建,
			//如果用户浏览器禁用了ActiveX,可能会失败
		}
		if(req2) //对象创建成功
		{
			req2.open("GET", url, true); //与服务端建立连接(请求方式post或get，地址,true表示异步)
			req2.onreadystatechange = callback2; //指定回调函数
			req2.send(url); //发送请求

		}
	}
	//alert(url_cart);
	createReq2(url_cart);

	function callback2() {
		//alert(req2.readyState);
		if(req2.readyState == 4) {
			go_add_cart(req2.responseText);
		}
	}

	/*
            jQuery.getJSON('/'+base_script+'/goods/?act=checkGoodsAmount&goods_id='+GOODS_ID+'&type_keys='+type_ids.join(',')+'&attr_keys='+attr_ids.join(','),function(data){

            var goodsAmount = parseInt(jQuery("#goodsAmount").html()); //要购买商品数量
            if(data.amount>0&&goodsAmount<=data.amount){
                    if(is_login != 0){

                        jQuery.getJSON("/"+base_script+"/shoppingcar/?act=addCart&optType=addCartBtn&goods_id="+GOODS_ID+'&goods_sku_sn='+GOODS_SKU_SN+'&amount='+goodsAmount+'&goods_name='+GOODS_NAME+'&type_names='+type_names+'&type_ids='+type_ids+'&attr_ids='+attr_ids+'&attr_names='+attr_names+'&shop_price='+PRICE,function(data){
                            if(data.rs == "true"){
															refresh_cart_num();
                                alert('加入购物车成功！');
                            }else{
                                alert(data.msg);
                            }
                        });
                    }else{
//                        alert('请先登录后再进行操作！');
                        //判断是否在微信浏览器中打开
                        var ua = navigator.userAgent.toLowerCase();
                        var isWeixin = ua.indexOf('micromessenger') != -1;
                        if (!isWeixin) {
                            //window.location.href="/i/mob_login?act=mobile&gourl=/"+ base_script + "/goods/?id=" + GOODS_ID;
                            var gorul = "/"+ base_script + "/goods/?opt=addcart&id=" + GOODS_ID;
                            gorul = encodeURIComponent(gorul);
                            history.replaceState(null, "", "/i/mob_login?act=mobile&gourl="+ gorul);
                            window.location.reload();
                        }else{
                            //window.location.href="/i/weixin?act=access&gourl=/" + base_script + "/goods/?id=" + GOODS_ID;

                            var gorul = "/"+ base_script + "/goods/?opt=addcart&id=" + GOODS_ID;
                            gorul = encodeURIComponent(gorul);
                            history.replaceState(null, "", "/i/mob_login?act=mobile&gourl="+ gorul);
                            window.location.reload();
                        }
                    }
            }else{
                    alert('库存不足');
            }

            });
            */
}
//
jQuery(document).ready(function() {
	//jQuery(window).bind('scroll',showData);
	// lss
	jQuery('#actionContainer').mouseover(function() {
		jQuery('#preCircle2,#nextCircle2').css('opacity', 1);
	}).mouseout(function() {
		jQuery('#preCircle2,#nextCircle2').css('opacity', 0);
	});
	jQuery('#leftArea,#preCircle2').mouseover(function() {
		jQuery('#preCircle2').css('background-image', 'url(/images/default/circle_right_arrow1.png)');
	}).mouseout(function() {
		jQuery('#preCircle2').css('background-image', 'url(/images/default/normal_right.png)');
	});

	jQuery('#rightArea,#nextCircle2').mouseover(function() {
		jQuery('#nextCircle2').css('background-image', 'url(/images/default/circle_left_arrow1.png)');
	}).mouseout(function() {
		jQuery('#nextCircle2').css('background-image', 'url(/images/default/normal_left.png)');
	});

	var slide = new Swiper('.xswiper-slide', {
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});

	var swiper = new Swiper('.swiper-container', {
		width: 192,
		autoplay: 2000,
		spaceBetween: 16
	});
});
var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
if(ua.match(/WeiBo/i) == "weibo") {
	$(".goodsDetail .infoCon .txtCon").css("font-size", "24px");
	$(".goodsDetail .infoCon p").css("font-size", "24px");
	$(".goodsDetail .infoCon p").css("line-height", "30px")
}