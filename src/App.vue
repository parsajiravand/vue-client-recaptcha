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

<script lang="ts">
import { defineComponent, ref } from "vue";
import VueClientRecaptcha from "./components/vue-client-recaptcha.vue";
export default defineComponent({
  components: {
    VueClientRecaptcha,
  },
  setup() {
    /* pass value to captcha  */
    const inputValue = ref<string|null>(null);

    const getCaptchaCode = (value:string) => {
      /* you can access captcha code */
      console.log(value);
    };
    const checkValidCaptcha = (value:string) => {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      console.log(value);
    };
    return {
      inputValue,
      getCaptchaCode,
      checkValidCaptcha,
    };
  },
})
</script>
