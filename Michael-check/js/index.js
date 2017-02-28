/**
 * @author songliping <slp7756646@126.com> 
 * @description liangcang index.js 
 * @version 1.1
 */
!function () {
    var bannerUrl = 'http://datainfo.duapp.com/shopdata/getGoods.php'; // 后台接口

    /**
     * @description 获取轮播数据 
     */
    function getBanner(url, callback) {
        $.ajax({
            data: {
                linenumber: 10
            },
            url: url,
            method: 'POST',
            dataType: 'JSONP',
            jsonpCallback: 'banner',
            success: function (data) {
                callback(data);
            }
        });
    }

    /**
     * @description 处理数据 
     */
    function parseBanner(bannerData) {
        console.log(bannerData);
    }
    getBanner(bannerUrl, parseBanner);

}();
