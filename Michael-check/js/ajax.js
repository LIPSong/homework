

/**
 * 
 * @param {Object} url
 * @param {Object} options
 * @param {Object} callback
 */
function getGoods(url, options, callback, dataType) {
    $.ajax({
        type: 'POST',
        url: url,
        data: options,
        dataType: dataType,
        success: function (data) {
            callback(data);
        }
    });
}

/**
 * 
 * @param {Object} classID
 * @param {Object} goodsID
 * @param {Object} pageCode
 * @param {Object} lineumber
 */
function GetOptions(classID, goodsID, pageCode, linenumber) {
    this.classID = classID || null;
    this.goodsID = goodsID || null;
    this.pageCode = pageCode || null;
    this.linenumber = linenumber || null;
}
function SearchOptions(selectText, pageCode, linenumber) {
    this.selectText = selectText || null;
    this.pageCode = pageCode || null;
    this.linenumber = linenumber || null;
}
function UpdateCart(userID, goodsID, number) {
    this.userID = userID;
    this.goodsID = goodsID;
    this.number = number;
}

/**
 * 
 * @param {Object} name @description 获取相应参数
 */
function GetQueryString(name) {

    /*定义正则，用于获取相应参数*/
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');

    /*字符串截取，获取匹配参数值*/
    var r = window.location.search.substr(1).match(reg);

    /*但会参数值*/
    if (r != null) {
        return decodeURI(r[2]);
    }

    return null;
}

/**
 * 登录验证
 * @param {Object} callback
 */
function checkLogin(callback) {
    var closeTime = 36000000;
    if (localStorage.isLogin && (Date.now() - localStorage.closeDate < closeTime)) {
        callback();
    }
    else {
        localStorage.clear();
    }
}

/**
    	 * 用户头像点击弹出框
    	 */
$('.profile-div').click(function () {
    if ($('#logout-div')[0].style.display == 'block') {
        $('#logout-div').hide();
    }
    else {
        $('#logout-div').show();
    }
});

/**
	 * 设置logout退出按钮清空localstorage
	 */
$('#logout').click(function () {
    localStorage.clear();
    window.location.href = 'index.html';
});
