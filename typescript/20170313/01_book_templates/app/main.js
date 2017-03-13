(function () {
    // 可以 数据持久化到 浏览器的 记账本
    // 就需要 频繁的 操作 读取 写入的 方法
    // 就 封装了  数据操作的类 DataManager

    // 读取 写入的操作  没必要 重复创建对象
    // 就 写成了  静态方法(类方法) -> 使用 类名去调用
    function app1() {
        new Vue({
            el: '#app',
            data: {
                list: [33, 22, 44]
            },
            method: {
                show: function (info) {
                    alert(info);
                }
            }
        });
    }
    // 存储读取localstorage中的数据
    class DataManager {
        // 插入数据
        static insertData(list) {
            window.localStorage.setItem('bookList', JSON.stringify(list) || []);
        }
        ;
        // 读取数据
        static readData() {
            // todo:maybr a string.
            console.log();
            return JSON.parse(window.localStorage.getItem('bookList')) || [];
        }
        ;
    }
    // 每条记录的类
    class BookItem {
        constructor(_title, _des, _price) {
            this.title = _title;
            this.des = _des;
            this.price = _price;
            // 创建账目的时间 Date()获取系统时间
            this.date = Date();
            // 是否超出预计支出
            this.isFull = false;
        }
    }
        var web = {
        	props:["datas"],
        template:"<div><p v-for='info in goodsinfo'><label for='title-input' v-text='info'></label><input id='title-input' type='text' v-model='datas[info]'></p><button v-on:click=addbook(datas)>add_data</button></div>",
        data:
        	function(){
        		return {goodsinfo:['title','price','des']}           
        },
        methods:{
        	
        	addbook:function(info){
        		this.$emit("addbook",info)
        		}
        }
    };
    var booklist = {
    		props:["books"],
    		template:"<ul><li :class='{full:obj.isFull}' v-for='obj in books' v-on:click=addmark(obj)><p><span v-text='obj.title'></span><span v-text='obj.date'></span></p><p v-text='obj.des'></p><p v-text='obj.price'></p></li></ul>",
    		methods:{
    			addmark: function (info) {
                        this.$emit("addmark",info);
                    }
    		}
    }
    // 创建应用的类 创建两个让html调用的读写方法，必须跟html关联上，就需要一个连接点 数据模型：bookList属性
    // 读写更新的数据都需要同步到bookList
    class App {
        constructor() {
            let config = {
                el: '#app',
                data: {
                    // 为了防止在html中添加数据添加不进去（对象没有初始化）
                    bookInfo: {},
                    bookList: DataManager.readData()
                },
                components:{
                    "web":web,
                    "booklist":booklist
                },
                methods: {
                    setData: function (info) {
                        var bookItem = new BookItem(info.title, info.des, info.price);
                        this.bookList.push(bookItem);
                        DataManager.insertData(this.bookList);
                    },
                    //					getData:function(){
                    //						this.bookList = DataManager.readData();
                    //						return this.bookList;
                    //					},
                    addMark: function (info) {
                        info.isFull = !info.isFull;
                    }
                },
                watch: {
                    bookList: {
                        deep: true,
                        handler: function (value) {
                            DataManager.insertData(value);
                        }
                    }
                }
            };
            this.vue = new Vue(config);
        }
    }
    new App();
})();
