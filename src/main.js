import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueFab from 'vue-float-action-button';
import wv from './utils/wv';

Vue.use(Vant);
Vue.use(VueFab);
wv.init();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
