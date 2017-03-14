"use strict";
const Vue = require("../index");
class Option {
}
const plugin = {
    install(Vue, option) {
        if (typeof option !== "undefined") {
            const { prefix, suffix } = option;
        }
    }
};
const installer = function (Vue, option) { };
Vue.use(plugin, new Option);
Vue.use(installer, new Option);
