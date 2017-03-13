(function () {
    var text = new Vue({
        el: '#container',
        data: {
            n: localStorage.key(localStorage.length - 1) || 0,
            arr: [],
            content: ''
        },
        methods: {
            saveText: function (data) {
                this.n = parseInt(this.n, 10) + 1;
                window.localStorage[this.n] = data;
                this.arr = [];
                this.updata();
            },
            del: function (data) {
                this.content = '';
                window.localStorage.removeItem(data);
                this.arr = [];
                this.updata();
            },
            updata: function () {
                for (var i = 0; i < localStorage.length; i++) {
                    var index = localStorage.key(i);
                    var value = localStorage.getItem(index);
                    this.arr.push({index: index, value: value});
                }
            }
        }
    });
    text.updata();
})();
