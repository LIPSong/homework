(function(){
    //唯一向外暴露的顶层变量
    var myajax = window.myajax = {};
    //作者和版本信息
    myajax.author = "maxlwell";
    myajax.version = "1.0.0";

    //这个对象有两个属性，get, post属性，都是函数
    myajax.get = function(URL, queryJSON, callback) {
        //创建xhr对象，处理兼容问题
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHttp");
        }
        //  配置响应结果如何处理
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"), undefined);
                }
            }
        };
        var querystring = myajax._queryjson2string(queryJSON);
        //配置发送的信息
        xhr.open("GET", URL + "?" + querystring, true);
        //发送
        xhr.send(null);
    };

    myajax.post = function(URL, queryJSON, callback) {
        //创建xhr对象，处理兼容问题
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHttp");
        }
        //  配置响应结果如何处理
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"), undefined);
                }
            }
        };
        var querystring = myajax._queryjson2string(queryJSON);
        //配置发送的信息
        xhr.open("POST", URL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送
        xhr.send(querystring);
    };

    //内部函数，查询json变成查询字符串
    //输入一个{"name":"maxwell", "age":18}
    //返回一个 name=maxwell&age=18
    myajax._queryjson2string = function(json) {
        var arr = [];
        for (var k in json) {
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    }
})();