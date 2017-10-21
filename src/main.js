// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
