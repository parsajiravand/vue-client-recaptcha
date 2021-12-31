import { defineComponent, ref, watchEffect, onMounted, computed, h } from 'vue';

var vueClientRecaptcha = defineComponent({
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
        var alpha = ref(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        var code = ref("");
        var captcha = function () {
            var i;
            for (i = 0; i < 6; i++) {
                code.value +=
                    alpha.value[Math.floor(Math.random() * alpha.value.length)];
            }
        };
        watchEffect(function () {
            if (code.value === props.value) {
                emit("isValid", true);
            }
            else {
                emit("isValid", false);
            }
        });
        onMounted(function () {
            captcha();
            emit("getCode", code.value);
        });
        return function () {
            return computed(function () {
                return h("div", [h('span', code.value), h("button", {
                        onClick: function () { code.value = "", captcha(); }
                    }, "change")]);
            }).value;
        };
    }
});

export { vueClientRecaptcha as default };
