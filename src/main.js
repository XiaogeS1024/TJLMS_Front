import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://114.55.35.220:8080/api'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
