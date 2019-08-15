import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
import VeeValidate from "vee-validate";
import VueSidebarMenu from '../static/sidebar/src/index'
import BootstrapVue from 'bootstrap-vue'
import mysidebar from "./components/sidebar/mysidebar.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../static/fontawesome/css/all.css'
import '../static/fontawesome/js/all'
import '../static/sidebar/dist/vue-sidebar-menu.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.use(ElementUI);

Vue.component('mysidebar', mysidebar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
