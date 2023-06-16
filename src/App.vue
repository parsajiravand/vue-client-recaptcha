<script lang="ts" setup>
import VueClientRecaptcha from './components/vue-client-recaptcha.vue'

import { ref } from 'vue';
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
</script>
<template>
  <div>
    <VueClientRecaptcha :value="inputValue" @getCode="getCaptchaCode" @isValid="checkValidCaptcha" />
  </div>
</template>

<style>

</style>