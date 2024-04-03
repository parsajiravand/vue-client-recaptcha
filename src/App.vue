<script lang="ts" setup>
import VueClientRecaptcha from "./components/vue-client-recaptcha.vue";

import { ref } from "vue";
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
const captchaRef = ref(null);

</script>
<template>
  <div>
    <!-- Button for resest captcha -->
    <button @click="captchaRef.resetCaptcha()">Reset Captcha</button>

    <!-- VueClientRecaptcha component -->
    <VueClientRecaptcha
      ref="captchaRef"
      :value="inputValue"
      :hideRefreshIcon="true"
      @getCode="getCaptchaCode"
      @isValid="checkValidCaptcha"
    />
  </div>
</template>

<style></style>
