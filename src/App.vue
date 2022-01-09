<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "@vue/reactivity";
import VueClientRecaptcha from "./components/vue-client-recaptcha.vue";
const val = ref("");
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <input type="text" v-model="val" />
  <VueClientRecaptcha
    :val="val"
    :show-numbers="true"
    :showCapitalCaseLetters="false"
    :showLowerCaseLetters="false"
    :count="5"
    :hideLines="false"
    customTextColor=""
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
