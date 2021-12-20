import Vue from 'vue'
import Vuetify from 'vuetify'
import en from 'vuetify/es5/locale/en'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#4CAF50'
      }
    }
  },
  lang: {
    locales: { en },
    current: 'en'
  }
})
