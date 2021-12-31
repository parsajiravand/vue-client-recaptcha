<template>
  <jsxNode />
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

const alpha = ref<any>([
  ...(props.showNumbers ? props.numbers : []),
  ...(props.showCapitalCaseLetters ? props.capitalCaseLetters : []),
  ...(props.showLowerCaseLetters ? props.lowerCaseLetters : []),
]);

let code = ref("");
onMounted(() => {
  setTimeout(() => {
      const canvas = document.getElementById("canvass");
const ctx = canvas.getContext("2d");
ctx.fillText(code.value,50,50);
  }, 3000);

})
const captcha = () => {
  let i;
  for (i = 0; i < 6; i++) {
    code.value += alpha.value[Math.floor(Math.random() * alpha.value.length)];
  }
};
watchEffect(() => {
  if (code.value === props.val) {
    emit("isValid", true);
  } else {
    emit("isValid", false);
  }
});
onMounted(() => {
  captcha();
  emit("getCode", code.value);
});

const render = () => {
  return h("div", [
    h("canvas", { style: "background:#eee;padding:15px",id:"canvass" }, code.value),
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
