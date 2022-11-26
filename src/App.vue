<template>
  <div class="sample-captcha">
    <input type="text" v-model="inputValue" />

    <!-- create list for carachters and select random color for each item -->
    <VueClientRecaptcha
      :value="inputValue"
      :textColors="[
        'blue',
        'red',
        'purple',
        'green',
        '#e83e8c',
        '#ff5578',
        '#53b29f',
        '#d64a37',
        '#094899',
        '#f64141',
        'rgb(77,190,255)',
      ]"
      @getCode="getCaptchaCode"
      @isValid="checkValidCaptcha"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueClientRecaptcha from "./components/vue-client-recaptcha.vue";
export default defineComponent({
  components: {
    VueClientRecaptcha,
  },

  data() {
    return {
      inputValue: null,
    };
  },
  methods: {
    getCaptchaCode(value: string) {
      /* you can access captcha code */
      console.log("captcha code", value);
    },
    checkValidCaptcha(value: string) {
      /* expected return boolean if your value and captcha code are same return True otherwise return False */
      console.log(value);
    },
  },
});
</script>
