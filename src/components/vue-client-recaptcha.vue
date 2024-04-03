<template>
  <render />
</template>
<script setup lang="ts">
import { h, ref, onMounted, watchEffect, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    value?: string | null;
    chars?: string;
    count?: number;
    hideLines?: boolean;
    customTextColor?: string;
    textColors?: string[];
    isDirty?: boolean;
    width?: any;
    height?: number;
    canvasClass?: string;
    icon?: string;
    captchaFont?: string;
    hideRefreshIcon?: boolean;
  }>(),
  {
    value: "",
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    count: 5,
    hideLines: false,
    customTextColor: "",
    textColors: () => [],
    isDirty: true,
    width: function (props: any) {
      return props.count * 30;
    },
    height: 50,
    canvasClass: "",
    icon: "refresh",
    captchaFont: "bold 28px sans-serif",
    hideRefreshIcon: false,
  }
);

/* access slots */
const slots = useSlots();
/* access slots */

/* emits to parnet */
const emit = defineEmits(["isValid", "getCode"]);
/* emits to parnet */

/* template refs */
const captcha_canvas = ref();
/* template refs */

/* Variables */
let code = ref("");
let canvasWidth = props.width;
let canvasHeight = props.height;
/* Variables */

onMounted(() => {
  /* generate captcha for first time */
  captcha();
});
const captcha = () => {
  captcha_canvas.value.width = canvasWidth;
  captcha_canvas.value.height = canvasHeight;

  let ctx = captcha_canvas.value.getContext("2d");
  for (let i = 0; i < props.count; i++) {
    let sIndex = Math.floor(Math.random() * props.chars.length);
    let sDeg = (Math.random() * 30 * Math.PI) / 180;
    let cTxt = props.chars[sIndex];
    code.value += cTxt;
    /* props.chars = cTxt.toLowerCase(); */
    let x = 10 + i * 25;
    let y = 30 + Math.random() * 8;
    // ctx font list https://www.w3school.com.cn/tags/canvas_font.asp
    ctx.font = props.captchaFont;
    ctx.translate(x, y);
    if (props.customTextColor) {
      ctx.fillStyle = props.customTextColor;
    } else if (props.textColors.length) {
      ctx.fillStyle =
        props.textColors[Math.floor(Math.random() * props.textColors.length)];
    } else {
      ctx.fillStyle = randomColor();
    }
    ctx.rotate(sDeg);
    ctx.fillText(cTxt, 0, 0);
    ctx.rotate(-sDeg);
    ctx.translate(-x, -y);
  }
  if (!props.hideLines) {
    createLines();
  }
  sendValueToParent();
};
const createLines = () => {
  let ctx = captcha_canvas.value.getContext("2d");
  for (let i = 0; i < props.count; i++) {
    ctx.strokeStyle = randomColor();
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    ctx.stroke();
  }
};
const sendValueToParent = () => {
  emit("getCode", code.value);
};
watchEffect(() => {
  if (code.value && code.value === props.value) {
    emit("isValid", true);
  } else {
    emit("isValid", false);
  }
});
const randomColor = () => {
  /* this function can generate random color for letters and dirtyLines */
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
};
const resetCaptcha = () => {
  let ctx = captcha_canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  code.value = "";
  captcha();
};
// expose public methods
defineExpose({
  resetCaptcha,
});
// render function
const render = () => {
  return h("div", { class: "vue_client_recaptcha" }, [
    h(
      props.hideRefreshIcon ? "" : "div",
      { class: "vue_client_recaptcha_icon", onClick: () => resetCaptcha() },
      [
        h(
          slots.icon ? slots.icon : "svg",
          {
            class: "vue_client_recaptcha_icon_svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          [
            h("path", {
              d: "M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z",
              fill: "#333333",
            }),
          ]
        ),
      ]
    ),
    h(
      "canvas",
      {
        id: "captcha_canvas",
        class: `captcha_canvas ${props.canvasClass}`,
        ref: captcha_canvas,
      },
      code.value
    ),
  ]);
};
</script>
<style>
.vue_client_recaptcha {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.vue_client_recaptcha_icon {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  transition: background-color 0.3s ease-in-out;
}
.vue_client_recaptcha_icon:hover {
  background-color: #cccccc;
}
.vue_client_recaptcha .captcha_canvas {
  background: #eee;
  padding: 10px 0px;
}
</style>
