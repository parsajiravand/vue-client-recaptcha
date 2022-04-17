const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
import banner from 'vite-plugin-banner'
import pkg from "./package.json";

// https://vitejs.dev/config/

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;
export default defineConfig({

  build: {
    lib: {
      banner,
      entry: path.resolve(__dirname, 'src/components/vue-client-recaptcha.vue'),
      name: 'VueClientRecaptcha',
      fileName: (format) => `vue-client-recaptcha.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
});