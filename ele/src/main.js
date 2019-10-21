// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import '../node_modules/swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store/index'
Vue.use(VueAwesomeSwiper)
Vue.use(elementUI)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App }, 
  template: '<App/>'
})
