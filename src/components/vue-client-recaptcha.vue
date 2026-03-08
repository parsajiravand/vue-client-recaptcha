<template>
  <render />
</template>
<!--
  VueClientRecaptcha - Client-side captcha component for Vue 3.
  @component
  @prop {string} [modelValue] - User input to validate (use with v-model)
  @prop {string} [value] - Deprecated: use modelValue or v-model
  @prop {string} [chars] - Custom character set when charsPreset is 'custom'
  @prop {'alphanumeric'|'numeric'|'letters'|'custom'} [charsPreset] - Character preset
  @prop {number} [count] - Number of characters in captcha (default: 5)
  @prop {boolean} [hideLines] - Hide distortion lines
  @prop {string} [customTextColor] - Fixed text color
  @prop {string[]} [textColors] - Random colors for text
  @prop {number|function} [width] - Canvas width (number or (p)=>number)
  @prop {number} [height] - Canvas height (default: 50)
  @prop {string} [canvasClass] - Additional canvas CSS class
  @prop {string} [icon] - Icon type (default: 'refresh')
  @prop {string} [captchaFont] - Canvas font (default: 'bold 28px sans-serif')
  @prop {boolean} [hideRefreshIcon] - Hide refresh button
  @prop {number} [radius] - Border radius in px
  @prop {string} [refreshLabel] - A11y label for refresh button
  @prop {string} [canvasLabel] - A11y label for canvas
  @prop {'auto'|'light'|'dark'} [theme] - Theme mode
  @prop {number} [noiseDots] - Number of noise dots (0 to disable)
  @prop {number} [noiseLines] - Number of distortion lines (-1 for count)
  @prop {'none'|'lines'|'dots'|'both'} [distortion] - Distortion type
  @prop {boolean} [audioEnabled] - Enable audio playback of code
  @event {boolean} isValid - Emitted when validation state changes
  @event {boolean} update:valid - v-model:valid sync
  @event {string} getCode - Emitted with captcha code on generate/refresh
  @event {string} refresh - Emitted when captcha is regenerated
  @event ready - Emitted when canvas is ready
  @event {Error} error - Emitted on canvas/context failure
  @expose {function} resetCaptcha - Regenerate captcha
-->
<script setup lang="ts">
import { h, ref, computed, onMounted, watch, watchEffect, useSlots } from "vue";
import { useCaptcha } from "../composables/useCaptcha";

const CHAR_PRESETS = {
  alphanumeric: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  numeric: "0123456789",
  letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  custom: "",
} as const;

function secureRandom(): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0]! / (0xffffffff + 1);
  }
  return Math.random();
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | null;
    /** @deprecated Use v-model or modelValue instead */
    value?: string | null;
    chars?: string;
    charsPreset?: "alphanumeric" | "numeric" | "letters" | "custom";
    count?: number;
    hideLines?: boolean;
    customTextColor?: string;
    textColors?: string[];
    width?: number | ((p: { count: number }) => number);
    height?: number;
    canvasClass?: string;
    icon?: string;
    captchaFont?: string;
    hideRefreshIcon?: boolean;
    radius?: number;
    refreshLabel?: string;
    canvasLabel?: string;
    theme?: "auto" | "light" | "dark";
    noiseDots?: number;
    noiseLines?: number;
    distortion?: "none" | "lines" | "dots" | "both";
    audioEnabled?: boolean;
  }>(),
  {
    modelValue: "",
    value: "",
    chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    charsPreset: "alphanumeric",
    count: 5,
    hideLines: false,
    customTextColor: "",
    textColors: () => [],
    width: (p: { count: number }) => p.count * 30,
    height: 50,
    canvasClass: "",
    icon: "refresh",
    captchaFont: "bold 28px sans-serif",
    hideRefreshIcon: false,
    radius: 0,
    refreshLabel: "Refresh captcha",
    canvasLabel: "Captcha image",
    theme: "light",
    noiseDots: 0,
    noiseLines: -1,
    distortion: "lines",
    audioEnabled: false,
  }
);

/* access slots */
const slots = useSlots();
/* access slots */

/* emits to parent */
const emit = defineEmits<{
  isValid: [value: boolean];
  "update:valid": [value: boolean];
  getCode: [code: string];
  "update:modelValue": [value: string];
  refresh: [code: string];
  ready: [];
  error: [error: unknown];
}>();
/* emits to parent */

/* template refs */
const captcha_canvas = ref<HTMLCanvasElement | null>(null);
/* template refs */

/* useCaptcha composable for code generation */
const captchaLogic = useCaptcha(() => ({
  chars: props.chars,
  charsPreset: props.charsPreset,
  count: props.count,
}));
const code = captchaLogic.code;
/* Variables */
const canvasWidth = computed(() =>
  typeof props.width === "function" ? props.width(props) : props.width
);
const canvasHeight = computed(() => props.height);
const effectiveChars = computed(() =>
  props.charsPreset === "custom"
    ? props.chars
    : CHAR_PRESETS[props.charsPreset] || CHAR_PRESETS.alphanumeric
);
const inputValue = computed(
  () => (props.modelValue !== undefined && props.modelValue !== null ? props.modelValue : props.value) ?? ""
);
const isValid = computed(() => !!(code.value && code.value === inputValue.value));
/* Variables */

onMounted(() => {
  if (!captcha_canvas.value) {
    emit("error", new Error("Canvas ref not available"));
    return;
  }
  try {
    captcha();
    emit("ready");
  } catch (e) {
    emit("error", e);
  }
});

watch(
  [canvasWidth, canvasHeight],
  () => {
    if (captcha_canvas.value) captcha();
  },
  { flush: "post" }
);

// Watch for visual prop changes to regenerate captcha
watch(
  [
    () => props.distortion,
    () => props.noiseDots,
    () => props.noiseLines,
    () => props.hideLines,
    () => props.customTextColor,
    () => props.textColors,
    () => props.captchaFont
  ],
  () => {
    if (captcha_canvas.value) captcha();
  },
  { flush: "post" }
);
const captcha = () => {
  if (!captcha_canvas.value) return;
  code.value = "";
  captcha_canvas.value.width = canvasWidth.value;
  captcha_canvas.value.height = canvasHeight.value;

  const ctx = captcha_canvas.value.getContext("2d");
  if (!ctx) {
    emit("error", new Error("Failed to get canvas 2d context"));
    return;
  }
  captchaLogic.generate();
  const codeStr = code.value;
  if (!codeStr) return;
  for (let i = 0; i < codeStr.length; i++) {
    const cTxt = codeStr[i]!;
    const sDeg = (secureRandom() * 30 * Math.PI) / 180;
    const x = 10 + i * 25;
    const y = 30 + secureRandom() * 8;
    // ctx font list https://www.w3school.com.cn/tags/canvas_font.asp
    ctx.font = props.captchaFont;
    ctx.translate(x, y);
    if (props.customTextColor) {
      ctx.fillStyle = props.customTextColor;
    } else if (props.textColors.length) {
      ctx.fillStyle =
        props.textColors[Math.floor(secureRandom() * props.textColors.length)]!;
    } else {
      ctx.fillStyle = randomColor();
    }
    ctx.rotate(sDeg);
    ctx.fillText(cTxt, 0, 0);
    ctx.rotate(-sDeg);
    ctx.translate(-x, -y);
  }
  const showLines =
    !props.hideLines &&
    (props.distortion === "lines" || props.distortion === "both");
  const showDots = props.distortion === "dots" || props.distortion === "both";
  if (showLines) createLines();
  if (showDots && props.noiseDots) createNoiseDots();
  sendValueToParent();
  emit("refresh", code.value);
  if (props.audioEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(code.value.split("").join(" "));
    u.lang = "en-US";
    u.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
};
const lineCount = computed(() =>
  props.noiseLines >= 0 ? props.noiseLines : props.count
);
const createLines = () => {
  if (!captcha_canvas.value) return;
  const ctx = captcha_canvas.value.getContext("2d");
  if (!ctx) return;
  const count = lineCount.value;
  for (let i = 0; i < count; i++) {
    ctx.strokeStyle = randomColor();
    ctx.beginPath();
    ctx.moveTo(secureRandom() * canvasWidth.value, secureRandom() * canvasHeight.value);
    ctx.lineTo(secureRandom() * canvasWidth.value, secureRandom() * canvasHeight.value);
    ctx.stroke();
  }
};
const createNoiseDots = () => {
  if (!captcha_canvas.value || !props.noiseDots) return;
  const ctx = captcha_canvas.value.getContext("2d");
  if (!ctx) return;
  const w = canvasWidth.value;
  const h = canvasHeight.value;
  for (let i = 0; i < props.noiseDots; i++) {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.arc(secureRandom() * w, secureRandom() * h, 1, 0, Math.PI * 2);
    ctx.fill();
  }
};
const sendValueToParent = () => {
  emit("getCode", code.value);
};
watchEffect(() => {
  const valid = isValid.value;
  emit("isValid", valid);
  emit("update:valid", valid);
});
const randomColor = () => {
  const r = Math.floor(secureRandom() * 256);
  const g = Math.floor(secureRandom() * 256);
  const b = Math.floor(secureRandom() * 256);
  return `rgb(${r},${g},${b})`;
};
const resetCaptcha = () => {
  if (!captcha_canvas.value) return;
  const ctx = captcha_canvas.value.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  captcha();
};
// expose public methods
defineExpose({
  resetCaptcha,
});
// render function
const render = () => {
  const themeClass =
    props.theme === "auto"
      ? "vue_client_recaptcha_theme_auto"
      : props.theme === "dark"
        ? "vue_client_recaptcha_theme_dark"
        : "";
  return h(
    "div",
    {
      class: ["vue_client_recaptcha", themeClass].filter(Boolean).join(" "),
      style: {
        borderRadius: `var(--vcr-radius, ${props.radius}px)`,
        width: `${canvasWidth.value + 50}px`,
      },
    },
    [
      h(
        "span",
        {
          "aria-live": "polite",
          "aria-atomic": "true",
          class: "vue_client_recaptcha_sr_only",
        },
        isValid.value ? "Captcha verified" : ""
      ),
      ...(props.hideRefreshIcon
        ? []
        : [
            h(
              "div",
              {
                class: "vue_client_recaptcha_icon",
                role: "button",
                tabindex: 0,
                "aria-label": props.refreshLabel,
                onClick: () => resetCaptcha(),
                onKeydown: (e: KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    resetCaptcha();
                  }
                },
              },
              [
                slots.icon
                  ? h(slots.icon)
                  : h(
                      "svg",
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
                          fill: "currentColor",
                        }),
                      ]
                    ),
              ]
            ),
          ]),
      h(
        "canvas",
        {
          id: "captcha_canvas",
          class: `captcha_canvas ${props.canvasClass}`,
          role: "img",
          "aria-label": props.canvasLabel,
          ref: captcha_canvas,
        },
        code.value
      ),
    ]
  );
};
</script>
<style>
.vue_client_recaptcha {
  --vcr-bg: #eee;
  --vcr-text: inherit;
  --vcr-line: rgba(0, 0, 0, 0.3);
  --vcr-font: bold 28px sans-serif;
  --vcr-radius: 0;
  --vcr-padding: 10px;
  --vcr-icon-color: #333333;

  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  direction: ltr;
  background-color: var(--vcr-bg);
}

.vue_client_recaptcha_theme_dark {
  --vcr-bg: #333;
  --vcr-icon-color: #eee;
}

.vue_client_recaptcha_theme_auto {
  --vcr-bg: #eee;
  --vcr-icon-color: #333333;
}

@media (prefers-color-scheme: dark) {
  .vue_client_recaptcha_theme_auto {
    --vcr-bg: #333;
    --vcr-icon-color: #eee;
  }
}

.vue_client_recaptcha_icon {
  color: var(--vcr-icon-color);
  text-align: center;
  padding: var(--vcr-padding);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-in-out;
}
/* .vue_client_recaptcha_icon:hover {
  background-color: #cccccc;
} */
.vue_client_recaptcha .captcha_canvas {
  padding: var(--vcr-padding) 0;
  margin-left: var(--vcr-padding);
}

.vue_client_recaptcha_icon_svg path {
  fill: var(--vcr-icon-color);
}

.vue_client_recaptcha_sr_only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
