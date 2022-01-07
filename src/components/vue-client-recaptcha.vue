<template>
  <render />
</template>
<script setup lang="ts">
import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  onMounted,
  watchEffect,
} from "vue";
interface Props {
  val?: string;
  numbers: string[];
  capitalCaseLetters: string[];
  lowerCaseLetters: string[];
  showNumbers: boolean;
  showCapitalCaseLetters: boolean;
  showLowerCaseLetters: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  val: "",
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
});
const emit = defineEmits(["isValid", "getCode"]);
/* template refs */
const captcha_canvas = ref();
/* template refs */
let canvasWidth = 150;
let canvasHeight = 30;

const alpha = ref<any>([
  ...(props.showNumbers ? props.numbers : []),
  ...(props.showCapitalCaseLetters ? props.capitalCaseLetters : []),
  ...(props.showLowerCaseLetters ? props.lowerCaseLetters : []),
]);

let code = ref("");

onMounted(() => {
  captcha_canvas.value.width = canvasWidth;
  captcha_canvas.value.height = canvasHeight;
  captcha();
  createLines()
  emit("getCode", code.value);
});
const captcha =  () => {
  
  let ctx = captcha_canvas.value.getContext("2d");

  let saCode = alpha.value;
  let saCodeLen = saCode.length;

  for (let i = 0; i < 6; i++) {
    let sIndex = Math.floor(Math.random() * saCodeLen);
    let sDeg = (Math.random() * 30 * Math.PI) / 180;
    let cTxt = saCode[sIndex];
    code.value += cTxt;
    alpha[i] = cTxt.toLowerCase();
    let x = 10 + i * 20;
    let y = 20 + Math.random() * 8;
    ctx.font = "bold 28px 微软雅黑";
    ctx.translate(x, y);
    ctx.rotate(sDeg);

    ctx.fillStyle = randomColor();
    ctx.fillText(cTxt, 0, 0);

    ctx.rotate(-sDeg);
    ctx.translate(-x, -y);
  }
};
const createLines = ()=>{
  let ctx = captcha_canvas.value.getContext("2d");

 for (let i = 0; i <= 5; i++) {
    ctx.strokeStyle = randomColor();
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    ctx.stroke();
  }
}
watchEffect(() => {
  if (code.value === props.val) {
    emit("isValid", true);
  } else {
    emit("isValid", false);
  }
});
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

const render = () => {
  return h("div", [
    h(
      "canvas",
      {
        style: "background:#eee;padding:15px",
        id: "captcha_canvas",
        ref: captcha_canvas,
      },
      code.value
    ),
    h(
      "button",
      {
        onClick: () => {
          (code.value = ""), captcha();
        },
      },
      `change`
    ),
  ]);
};
</script>
