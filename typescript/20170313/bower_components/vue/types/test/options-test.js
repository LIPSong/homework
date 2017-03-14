"use strict";
const Vue = require("../index");
Vue.component('component', {
    data() {
        this.$mount;
        this.a;
        return {
            a: 1
        };
    },
    props: {
        size: Number,
        name: {
            type: String,
            default: 0,
            required: true,
            validator(value) {
                return value > 0;
            }
        }
    },
    propsData: {
        msg: "Hello"
    },
    computed: {
        aDouble() { }, this: Component } });
{
    return this.a * 2;
}
aPlus: {
    get(this, Component);
    {
        return this.a + 1;
    }
    set(this, Component, v, number);
    {
        this.a = v - 1;
    }
    cache: false;
}
methods: {
    plus();
    {
        this.a++;
    }
}
watch: {
    'a';
    function (val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`);
    }
    'b';
    'someMethod',
        'c';
    {
        handler(val, oldVal);
        {
            this.a = val;
        }
        deep: true;
    }
}
el: "#app",
    template;
"<div>{{ message }}</div>",
    render(createElement);
{
    return createElement("div", {
        attrs: {
            id: "foo"
        },
        props: {
            myProp: "bar"
        },
        domProps: {
            innerHTML: "baz"
        },
        on: {
            click: new Function
        },
        nativeOn: {
            click: new Function
        },
        class: {
            foo: true,
            bar: false
        },
        style: {
            color: 'red',
            fontSize: '14px'
        },
        key: 'myKey',
        ref: 'myRef'
    }, [
        createElement(),
        createElement("div", "message"),
        createElement(Vue.component("component")),
        createElement({}),
        createElement({ functional: true }),
        createElement(() => Vue.component("component")),
        createElement(() => ({})),
        createElement(() => {
            return new Promise((resolve) => {
                resolve({});
            });
        }),
        createElement((resolve, reject) => {
            resolve({});
            reject();
        }),
        "message",
        [createElement("div", "message")]
    ]);
}
staticRenderFns: [],
    beforeCreate();
{
    this.a = 1;
}
created();
{ }
beforeDestroy();
{ }
destroyed();
{ }
beforeMount();
{ }
mounted();
{ }
beforeUpdate();
{ }
updated();
{ }
activated();
{ }
deactivated();
{ }
directives: {
    a: {
        bind();
        { }
        inserted();
        { }
        update();
        { }
        componentMounted();
        { }
        unbind();
        { }
    }
    b(el, binding, vnode, oldVnode);
    {
        el.textContent;
        binding.name;
        binding.value;
        binding.oldValue;
        binding.expression;
        binding.arg;
        binding.modifiers["modifier"];
    }
}
components: {
    a: Vue.component(""),
        b;
    { }
    as;
    ComponentOptions();
}
transitions: { }
filters: {
    double(value, number);
    {
        return value * 2;
    }
}
parent: new Vue,
    mixins;
[Vue.component(""), {}],
    name;
"Component",
;
{ }
as;
ComponentOptions < Vue > ,
    delimiters;
["${", "}"];
as;
ComponentOptions();
Vue.component('component-with-scoped-slot', {
    render(h) {
        return h('div', [
            h('child', [
                // default scoped slot as children
                    (props) => [h('span', [props.msg])]
            ]),
            h('child', {
                scopedSlots: {
                    // named scoped slot as vnode data
                    item: (props) => [h('span', [props.msg])]
                }
            })
        ]);
    },
    components: {
        child: {
            render(h) {
                return h('div', [
                    this.$scopedSlots['default']({ msg: 'hi' }),
                    this.$scopedSlots['item']({ msg: 'hello' })
                ]);
            }
        }
    }
});
Vue.component('functional-component', {
    props: ['prop'],
    functional: true,
    render(createElement, context) {
        context.props;
        context.children;
        context.slots();
        context.data;
        context.parent;
        return createElement("div", {}, context.children);
    }
});
Vue.component("async-component", (resolve, reject) => {
    setTimeout(() => {
        resolve(Vue.component("component"));
    }, 0);
    return new Promise((resolve) => {
        resolve({ functional: true });
    });
});
