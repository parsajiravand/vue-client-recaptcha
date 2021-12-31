'use strict';

var vue = require('vue');

var vueClientRecaptcha = vue.defineComponent({
    props: {
        value: {
            type: String,
            "default": "",
            required: true
        }
    },
    // () => h(...)
    setup: function (props, _a) {
        var emit = _a.emit;
        var alpha = vue.ref(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        var code = vue.ref("");
        var captcha = function () {
            var i;
            for (i = 0; i < 6; i++) {
                code.value +=
                    alpha.value[Math.floor(Math.random() * alpha.value.length)];
            }
        };
        vue.watchEffect(function () {
            if (code.value === props.value) {
                emit("isValid", true);
            }
            else {
                emit("isValid", false);
            }
        });
        vue.onMounted(function () {
            captcha();
            emit("getCode", code.value);
        });
        return function () {
            return vue.computed(function () {
                return vue.h("div", [vue.h('span', code.value), vue.h("button", {
                        onClick: function () { code.value = "", captcha(); }
                    }, "change")]);
            }).value;
        };
    }
});

module.exports = vueClientRecaptcha;
