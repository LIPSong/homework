//购物车消息下拉菜单动画
$(document).ready(function() {
	$(".nav li").each(function() {
		$(this).mouseenter(function() {
			$(this).children(".hide").slideDown(100);
		})
		$(this).mouseleave(function() {
			$(this).children(".hide").slideUp(100);
		})
	})
	$(".header-top .logo a,.search .search-icon").mouseenter(function(){
		$(this).animate({"opacity":"0.8"},200)
	})
	$(".header-top .logo a,.search .search-icon").mouseleave(function(){
		$(this).animate({"opacity":"1"},200)
	})
	$(".subMenu ul>li>a").mouseenter(function(){
		$(this).addClass("active")
	})
	$(".subMenu ul>li>a").mouseleave(function(){
		$(this).removeClass("active")
	})
	$(".storeLeft dl").each(function(i){
		var $div = $("<div></div>");
		$div.addClass("fill");
		$div.css({"height":"110px","float":"left"});
		if(i < 7){
			$(this).mouseenter(function(){
				$(this).children("div:eq(1)").show(0);
				$(this).children("div").children("div").show(0);
				$(".storeLeft dl").eq(6).append($div);		
				})
			$(this).mouseleave(function(){
				$(".storeLeft dl").eq(6).children().remove(".fill");
				$(this).children("div:eq(1)").hide(0);
				$(this).children("div").children("div").hide(0);		
		 		})
			}else
		if(i < 14){
			$(this).mouseenter(function(){
				$(this).children("div:eq(1)").show(0);
				$(this).children("div").children("div").show(0);
				$(".storeLeft dl").eq(13).append($div);		
				})
			$(this).mouseleave(function(){
				$(".storeLeft dl").eq(13).children().remove(".fill");
				$(this).children("div:eq(1)").hide(0);
				$(this).children("div").children("div").hide(0);		
		 		})
			}else
		if(i < 19){
			$(this).mouseenter(function(){
				$(this).children("div:eq(1)").show(0);
				$(this).children("div").children("div").show(0);
				$(".storeLeft dl").eq(18).append($div);		
				})
			$(this).mouseleave(function(){
				$(".storeLeft dl").eq(18).children().remove(".fill");
				$(this).children("div:eq(1)").hide(0);
				$(this).children("div").children("div").hide(0);		
		 		})
			}
		
	})
	$("li.subLi").mouseenter(function(){
		$(this).children("div.submHide").show();
	})
	$("li.subLi").mouseleave(function(){
		$(this).children("div.submHide").hide();
	})
	$(".action-container").mouseenter(function(){
		$(".action-container .arrow").animate({"opacity":"1"},200);
		
	})
	$(".action-container").mouseleave(function(){
		$(".action-container .arrow").animate({"opacity":"0"},200);		
	})
	$("#leftArea").mouseenter(function(){
		$(this).children(".arrow").addClass("left-arrow-on");
		$(this).children(".arrow").animate({"opacity":"0.8"},200)
		
	})
	$("#leftArea").mouseleave(function(){
		$(this).children(".arrow").removeClass("left-arrow-on");
	})
	$("#rightArea").mouseenter(function(){
		$(this).children(".arrow").addClass("right-arrow-on");	
		$(this).children(".arrow").animate({"opacity":"0.8"},200)
	})
	$("#rightArea").mouseleave(function(){
		$(this).children(".arrow").removeClass("right-arrow-on");
		
	})
	/*搜索框弹出*/
	$(".search .search-icon").click(function(){	
		if($(".search-input").css("left") == "280px"){
			$(".search-input").animate({"left":"14px"},400)
		}else{
			$(".search-input").animate({"left":"280px"},400)
		}
	})
	/*说好的轮播*/
	var index = 0;//记录位置
	$(".images-container>ul").append($(".images-container>ul>li").eq(0).clone());
	function right(){
		if ($(".images-container ul").is(":animated")) return;
		index++;
		var cssValue = -index*1000 + "px";
		if(index < 7){
			$(".images-container ul").animate({"left":cssValue},500);
			$(".v2").eq(index).addClass("checked").siblings().removeClass("checked");
		}else{
			index = 0;
			$(".images-container ul").animate({"left":cssValue},500,function(){
				$(".images-container ul").css("left","0");
				
			});
			$(".v2").eq(0).addClass("checked").siblings().removeClass("checked");			
		}
	}
	function left(){
		if ($(".images-container ul").is(":animated")) return;
			index--;
			if(index < 0){
				$(".images-container ul").css({"left":"-7000px"},500);
				index = 6;
			}
			var cssValue = -index*1000 + "px";
			$(".images-container ul").animate({"left":cssValue},500);
			$(".v2").eq(index).addClass("checked").siblings().removeClass("checked");
	}
	$(".right-arrow").click(right);
	$(".left-arrow").click(left);
	$("#actionOpt a").click(function(){
		if ($(".images-container ul").is(":animated")) return;
		index = $(this).index();
		var cssValue = -index*1000 + "px";
		$(".images-container ul").animate({"left":cssValue},500);
		$(".v2").eq(index).addClass("checked").siblings().removeClass("checked");
	});
		right();
		var timer = setInterval(right, 2000);
		$(".images-container").mouseout(function(){
			timer = setInterval(right, 2000);
	});
		$(".images-container").mouseover(function(){
			clearInterval(timer);
	});
	/*轮播结束*/
	/*吸顶和回到顶部*/
	$(".backToTopV2").mouseenter(function(){
		$(this).animate({"opacity":"0.2"},300)
	})
	$(".backToTopV2").mouseleave(function(){
		$(this).animate({"opacity":"1"},300)
	})
	
	$(document).scroll(function(){
		if($(document).scrollTop() > 100){
			$(".backToTopV2").css("display","block");
		}else{$(".backToTopV2").css("display","none");}
		if($("#header").is(":animated"))return;
		if($(document).scrollTop() > 60){
			$("#header").addClass("header-on");	
		}else{
			$("#header").removeClass("header-on");	
		}
	});
	
	/*中部样式*/
	$(".middle>.item1:eq(0)").css({"left":"0","top":"0"});
	$(".middle>.item1:eq(1)").css({"top":"0","right":"0"});
	$(".middle>.item1:eq(2)").css({"left":"0","bottom":"0"});
	$(".middle>.item1:eq(3)").css({"bottom":"0","right":"0"})
	$("div.item").mouseenter(function(){
		$(this).children(".imgCon").children(".goodsinfo").show(1);
	})
	$("div.item").mouseleave(function(){
		$(this).children(".imgCon").children(".goodsinfo").hide(1);
	})
	/*手部动画*/
	$("#service>a").mouseover(function(){
		if($(".hand").is(":animated"))return;
		$(".hand").animate({"left":"-20px"},400);
		$(".hand").animate({"left":"0"},400);
		$(".hand").animate({"left":"-20px"},400);
		$(".hand").animate({"left":"0"},400);
	})
	/*二维码动画*/
	$(".download").mouseover(function(){
		$(this).children(".download-code").show();
	})
	$(".download").mouseout(function(){
		$(this).children(".download-code").hide();
	})
	$(".weixin").mouseover(function(){
		$(this).animate({"opacity":"1"},200);
		$(this).children(".wechat-code").show();
	})
	$(".weixin").mouseout(function(){
		$(this).animate({"opacity":"0.2"},200);
		$(this).children(".wechat-code").hide();
	})
})