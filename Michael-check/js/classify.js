var ClassifyUrl = 'http://datainfo.duapp.com/shopdata/getclass.php';
function parseClassify(data) {
    console.log(JSON.stringify(JSON.parse(data)));
}
getGoods(ClassifyUrl, {}, parseClassify, '');

/**
 * 获取商品详情
 */

/*
var details = new GetOptions();
details.goodsID = '2';
getGoods('http://datainfo.duapp.com/shopdata/getGoods.php',details,parseDetails,'JSONP');
function parseDetails(data){
	console.log(data[0].className);
}
*/
