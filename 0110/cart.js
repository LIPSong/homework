/*cart js*/


//�Ӽ���Ʒ����
function addAmount(type,cart_id){
	var goodsAmount = jQuery("#goodsAmount"+cart_id).val();
	if(isNaN(goodsAmount)||goodsAmount<=1) goodsAmount = 1;
	if(type==1){
		goodsAmount = parseInt(goodsAmount)+1;
		jQuery("#goodsAmount"+cart_id).val(goodsAmount)
	}else{
		if(goodsAmount==1) goodsAmount=2;
		goodsAmount = parseInt(goodsAmount)-1;
		jQuery("#goodsAmount"+cart_id).val(parseInt(goodsAmount))
	}
	var amount = jQuery("#goodsAmount"+cart_id).parent("td").siblings().eq(0).children("input");
	amount.attr('amount', goodsAmount) ;
	var subTotal = jQuery("#goodsAmount"+cart_id).parent("td").siblings().eq(3);
	subTotal.html(amount.attr('amount')*amount.attr('price'));
	getTotalPayMoney();
}

//ȫѡ
function  selectAll(type,obj){
	if(type=='all'){
		var isChecked = jQuery(obj).attr('checked')?true:false;
		jQuery("input[name='car_items[]']").attr("checked",isChecked);
	}
	getTotalPayMoney();
}

//����֧���ܽ��
function getTotalPayMoney(){
	var cart_amount = 0;
	var cart_price = 0;
	jQuery("input[name='car_items[]']:checked").each(function(){
		cart_amount += parseInt(jQuery(this).attr('amount'));
		cart_price += parseFloat(jQuery(this).attr('price'))*parseInt(jQuery(this).attr('amount'));
	});
	jQuery('#payMoney').val(cart_price.toFixed(2));
	jQuery('#payMoneyTxt').html(cart_price.toFixed(2));
	
}

//�Ƴ���Ʒ
function removeCar(e){
	var e = $(e);
	console.log(e);
	e.parent("td").parent("tr").remove();
}



