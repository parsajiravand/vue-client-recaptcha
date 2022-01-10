<template>
  <render />
</template>
<script setup lang="ts">
import { h, ref, onMounted, watchEffect, useSlots } from "vue";
interface Props {
  value?: string;
  numbers?: string[];
  capitalCaseLetters?: string[];
  lowerCaseLetters?: string[];
  showNumbers?: boolean;
  showCapitalCaseLetters?: boolean;
  showLowerCaseLetters?: boolean;
  count?: number;
  hideLines?: boolean;
  customTextColor?: string;
  isDirty?: boolean;
  width?: any;
  height?: number;
  canvasClass?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  numbers: () => ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  capitalCaseLetters: () => [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  lowerCaseLetters: () => [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  showNumbers: true,
  showCapitalCaseLetters: true,
  showLowerCaseLetters: true,
  count: 5,
  hideLines: false,
  customTextColor: "",
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
console.log(slots.header);
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

/* default have numbers and Englishletters(capital,lower)
  you can set your custom letters or remove each of these items
*/
const letters = ref<any>([
  ...(props.showNumbers ? props.numbers : []),
  ...(props.showCapitalCaseLetters ? props.capitalCaseLetters : []),
  ...(props.showLowerCaseLetters ? props.lowerCaseLetters : []),
]);
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
    let sIndex = Math.floor(Math.random() * letters.value.length);
    let sDeg = (Math.random() * 30 * Math.PI) / 180;
    let cTxt = letters.value[sIndex];
    code.value += cTxt;
    letters[i] = cTxt.toLowerCase();
    let x = 10 + i * 25;
    let y = 30 + Math.random() * 8;
    ctx.font = "bold 28px 微软雅黑";
    ctx.translate(x, y);
    if (props.customTextColor) {
      ctx.fillStyle = props.customTextColor;
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
  sendValueToParent()
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
const sendValueToParent = ()=>{
  emit("getCode", code.value);
}
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
          src:'/refresh.svg',
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
.vue_client_recaptcha .captcha_canvas{
background:#eee;padding:10px 0px
}
</style>
