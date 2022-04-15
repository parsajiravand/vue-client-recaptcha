import { App } from 'vue'
import VueClientRecaptcha from './VueClientRecaptcha.vue'

VueClientRecaptcha.install = (Vue: App) => {
  Vue.component(VueClientRecaptcha.name, VueClientRecaptcha)
}

export default VueClientRecaptcha
