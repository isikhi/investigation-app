import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VuePapaParse from 'vue-papa-parse'

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale: 'en' });
Vue.use(VuePapaParse)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
