<script lang="ts" setup>
import VueClientRecaptcha from "./components/vue-client-recaptcha.vue";
import { ref } from "vue";

const inputValue = ref("");
const isValid = ref(false);
const captchaRef = ref<InstanceType<typeof VueClientRecaptcha> | null>(null);

const getCaptchaCode = (value: string) => console.log("Code:", value);
const checkValidCaptcha = (value: boolean) => console.log("Valid:", value);
</script>
<template>
  <div>
    <input v-model="inputValue" placeholder="Enter captcha" />
    <button @click="captchaRef?.resetCaptcha?.()">Reset Captcha</button>
    <VueClientRecaptcha
      ref="captchaRef"
      v-model="inputValue"
      v-model:valid="isValid"
      :count="3"
      @getCode="getCaptchaCode"
      @isValid="checkValidCaptcha"
      :radius="20"
    />
  </div>
</template>

<style></style>
