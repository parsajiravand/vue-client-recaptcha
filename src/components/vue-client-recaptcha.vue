<template>
  <render />
</template>
<script setup lang="ts">
import { h, ref, onMounted, watchEffect, useSlots } from "vue";
interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
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
});

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
    ctx.font = "bold 28px 微软雅黑";
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
const render = () => {
  return h("div", { class: "vue_client_recaptcha" }, [
    h(
      "div",
      { class: "vue_client_recaptcha_icon", onClick: () => resetCaptcha() },
      [
        h(slots.icon ? slots.icon : "img", {
          src: "https://www.freeiconspng.com/uploads/black-refresh-icon-png-9.png",
          style: "width:60px",
        }),
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
}
.vue_client_recaptcha_icon:hover {
  background-color: #cccccc;
}
.vue_client_recaptcha .captcha_canvas {
  background: #eee;
  padding: 10px 0px;
}
</style>
