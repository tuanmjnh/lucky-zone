// import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
// Helpers
import helpers from './plugins/helpers'
// Local IP
import localIP from './plugins/local-ip'
// Mixins
import mixins from './plugins/mixins'
// Store
import store from './store'
// Router
import router from './router'
// Filters
import filters from './plugins/filters'
// Directive
import directive from './plugins/directive'
// Languages
import languages from './languages'
// Firebase
import { FBAuth } from './plugins/firebaseInit.js'
Vue.config.productionTip = false
let app
if (!app) {
  app = new Vue({
    mixins,
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}
