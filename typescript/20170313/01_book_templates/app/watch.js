// watch
(function () {
    class App {
        constructor(mark) {
            var config = {
                el: mark,
                data: {
                    list: [
                        {name: 'www', isOnStudy: false},
                        {name: 'qqq', isOnStudy: false},
                        {name: 'eee', isOnStudy: false}
                    ],
                    type: 'class-one',
                    ucaitype: 'class-two',
                    isChosen: true
                },
                methods: {
                    checkStudy: function (info) {
                        console.log(info);
                        info.isOnStudy = !info.isOnStudy;
                    }
                },
                watch: {
                    list: {
                        handler: function (newValue, oldValue) {
                            console.log('observer:\n', newValue, '\n', oldValue);
                        },
                        deep: true
                    }
                }
            };
            this.vue = new Vue(config);
        }
    }
    new App('#app');
})();
