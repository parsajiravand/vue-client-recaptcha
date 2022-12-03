

<br>
<p align="center">
  <a href="http://vue-client-recaptcha.netlify.com"><img src="https://i.postimg.cc/1fF5NyVV/captcha.png" alt="Demo" width="160"></a>
  <h2 align="center">vue-client-recaptcha</h2>
  <p align="center">Build simple recaptcha for vuejs without need server</p>
</p>

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
  <a href="https://travis-ci.org/parsajiravand/vue-client-recaptcha">
    <img src="https://img.shields.io/travis/parsajiravand/vue-client-recaptcha.svg?style=flat-square" alt="travis">
  </a>
</p>

<p align="center">
  <br>
  <strong>
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/usage"> 📚Document</a> ・
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/demos">🔎 Demos</a> ・
  <a style="font-size:20px" href="https://vue-client-recaptcha.netlify.app/playground"> 🔬 Playground</a>
  </strong>
</p>

## Dependencies
- required: Vuejs >= 3.x

## Installation
```bash
npm install vue-client-recaptcha --save
```
```bash
yarn add vue-client-recaptcha
```
## Usage
1. You can import globally in your vue-3 project (main.js)

```javascript
import { createApp } from 'vue'
import VueClientRecaptcha from 'vue-client-recaptcha'

const app= createApp(App)
app.component("VueClientRecaptcha", VueClientRecaptcha);  
```
2. You can import localy in your vue-3 component
```javascript
import VueClientRecaptcha from 'vue-client-recaptcha'

<!--Optional style.css-->
import 'vue-client-recaptcha/dist/style.css';

export default {
  components: {
    VueClientRecaptcha,
  },
}
```

## Props

| Name                  | Description                                                       | Type       | Default               |
| --------------------  | -------------------------------------------------------------------------------------------------------------------- | --------   | ------------------------|
| value                   | send the value with the component and check the entered value correctly                            | `string`   | ``                                                                |
| chars               | characters that captcha should be made with.                              | `string` | `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`                                                                
| count  | number of character | `number`  | `5`   
| hideLines  | hide dirty line and make captcha simple | `boolean`  | `false`   
| customTextColor  | set text color for all characters | `string`  | ``   
| textColors  | set random text color for each character in array of list | `string[]`  | ``   
| width  | width of captcha | `any`  | `count * 30`
| height  | width of captcha | `number`  | `50`
| canvasClass  | can set custom class for canvas | `string`  | ``
                                                                                                          
## Events

| Event            | Value  | Description                                    |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@isValid` | Boolean | can listen to payload , if your value and captcha code same return True otherwise return False |
| `@getCode` | String | can listen to payload , get captcha value and set variable |
## Slots

| Name    | Description |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`  | can set your custom template for icon  or changed to text (default icon is 'refresh' from fontawsome also you can change it with props  |     
###  Examples
```html
<template>
  <div class="sample-captcha">
    <input type="text" v-model="inputValue" />

    <VueClientRecaptcha
      :value="inputValue"
      @getCode="getCaptchaCode"
      @isValid="checkValidCaptcha"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import VueClientRecaptcha from "vue-client-recaptcha";
import "vue-client-recaptcha/dist/style.css";
export default {
  components: {
    VueClientRecaptcha,
  },
  setup() {
    /* pass value to captcha  */
    const inputValue = ref(null);

    const getCaptchaCode = (value) => {
      /* you can access captcha code */
      console.log(value);
    };
    const checkValidCaptcha = (value) => {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      console.log(value);
    };
    return {
      inputValue,
      getCaptchaCode,
      checkValidCaptcha,
    };
  },
};
</script>

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)