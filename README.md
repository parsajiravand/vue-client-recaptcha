<br>
<p align="center">
  <a href="http://vue-client-recaptcha.netlify.com"><img src="https://i.postimg.cc/CM6ZjS2F/vue-client-recaptcha.png" alt="Demo" width="140"></a>
  </br>

  <h2 align="center">vue-client-recaptcha</h2>
  <p align="center">Build simple recaptcha for vuejs without need server</p>
  </br>
  <div align="center">
    <a 
    href="http://vue-client-recaptcha.netlify.com"><img src="https://i.postimg.cc/1fF5NyVV/captcha.png" alt="Demo" width="160">
    </a>
  </div>
</p>
  </br>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-client-recaptcha">
    <img src="https://img.shields.io/npm/v/vue-client-recaptcha.svg?style=flat-square" alt="version">
  </a>
  <a href="https://github.com/parsajiravand/vue-client-recaptcha/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/vue-client-recaptcha.svg?style=flat-square" alt="MIT license">
  </a>
  <a href="http://npmcharts.com/compare/vue-client-recaptcha">
    <img src="https://img.shields.io/npm/dm/vue-client-recaptcha.svg?style=flat-square" alt="downloads">
  </a>
  <br>
  <a href="https://unpkg.com/vue-client-recaptcha/dist/">
    <img src="http://img.badgesize.io/https://unpkg.com/vue-client-recaptcha/dist/vue-client-recaptcha.umd.js?compression=gzip&label=gzip%20size&style=flat-square" alt="gzip size">
  </a>
  <a href="https://github.com/parsajiravand/vue-client-recaptcha/blob/master/package.json">
    <img src="https://img.shields.io/badge/dependencies-none-lightgrey.svg?style=flat-square" alt="no dependencies">
  </a>
</p>

<p align="center">
  <br>
  <strong>
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/usage"> 📚 Document</a> ・
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/demos">🔎 Demos</a> ・
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/playground"> 🔬 Playground</a>
  </strong>
</p>

## Dependencies

- **Required:** Vue.js >= 3.2 (peer dependency)

## Installation

```bash
npm install vue-client-recaptcha --save
```

```bash
yarn add vue-client-recaptcha
```

## Usage

### Basic

```vue
<script setup>
import { ref } from 'vue';
import { VueClientRecaptcha } from 'vue-client-recaptcha';

const inputValue = ref('');
const isValid = ref(false);
const captchaRef = ref(null);

const getCaptchaCode = (code) => console.log('Code:', code);
const checkValidCaptcha = (valid) => console.log('Valid:', valid);
</script>

<template>
  <div>
    <input v-model="inputValue" placeholder="Enter captcha" />
    <VueClientRecaptcha
      ref="captchaRef"
      v-model="inputValue"
      v-model:valid="isValid"
      @getCode="getCaptchaCode"
      @isValid="checkValidCaptcha"
    />
    <button @click="captchaRef?.resetCaptcha()">Reset</button>
  </div>
</template>
```

### v-model

- `v-model` – binds user input for validation
- `v-model:valid` – binds validation state (boolean)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` / `value` | `string` | `""` | User input to validate |
| `chars` | `string` | alphanumeric | Custom chars when `charsPreset` is `"custom"` |
| `charsPreset` | `"alphanumeric" \| "numeric" \| "letters" \| "custom"` | `"alphanumeric"` | Character preset |
| `count` | `number` | `5` | Number of captcha characters |
| `hideLines` | `boolean` | `false` | Hide distortion lines |
| `customTextColor` | `string` | `""` | Fixed text color |
| `textColors` | `string[]` | `[]` | Random text colors |
| `width` | `number \| (p) => number` | `p.count * 30` | Canvas width |
| `height` | `number` | `50` | Canvas height |
| `radius` | `number` | `0` | Border radius (px) |
| `hideRefreshIcon` | `boolean` | `false` | Hide refresh button |
| `refreshLabel` | `string` | `"Refresh captcha"` | A11y label for refresh |
| `canvasLabel` | `string` | `"Captcha image"` | A11y label for canvas |
| `theme` | `"auto" \| "light" \| "dark"` | `"light"` | Theme mode |
| `distortion` | `"none" \| "lines" \| "dots" \| "both"` | `"lines"` | Distortion type |
| `noiseDots` | `number` | `0` | Number of noise dots (0 = off) |
| `noiseLines` | `number` | `-1` | Distortion lines (-1 = use `count`) |
| `audioEnabled` | `boolean` | `false` | Speak code for screen readers |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `getCode` | `string` | Emitted with captcha code on generate/refresh |
| `isValid` | `boolean` | Validation state changed |
| `update:valid` | `boolean` | v-model:valid sync |
| `refresh` | `string` | Captcha regenerated |
| `ready` | – | Canvas ready |
| `error` | `unknown` | Canvas/context error |

### Composable

```vue
<script setup>
import { useCaptcha } from 'vue-client-recaptcha';

const { code, generate, validate, reset } = useCaptcha({
  charsPreset: 'numeric',
  count: 4
});

generate(); // Generate new code
const ok = validate('1234'); // Check input
</script>
```

## Security Note

This is a **client-side captcha**. It provides light protection against casual bots but is not a substitute for server-side validation. Do not rely on it for high-security use cases. Use reCAPTCHA or similar server-verified solutions for strong protection.

## Migration from v1 to v2

1. **Vue peer dependency** – Add Vue 3.2+ as a peer dependency in your project.
2. **`value` prop** – Prefer `v-model` or `modelValue`; `value` is deprecated but still supported.
3. **`width` prop** – Function default `(p) => p.count * 30` is now correctly resolved (v1 had a bug).
4. **`isDirty`** – Removed (was unused).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
