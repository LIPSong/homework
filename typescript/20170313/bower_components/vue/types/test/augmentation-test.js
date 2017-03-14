"use strict";
const Vue = require("../index");
const vm = new Vue({
    data: {
        a: true
    },
    foo: "foo"
});
vm.$instanceProperty;
vm.$instanceMethod();
Vue.staticProperty;
Vue.staticMethod();
