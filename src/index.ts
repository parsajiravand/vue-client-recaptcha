import { App } from 'vue'
import VueClientRecaptcha from './components/index'
function install(Vue: App) {
  Vue.component(VueClientRecaptcha.name, VueClientRecaptcha)
}

export default { install }

export { default as VueClientRecaptcha } from './components/index'
