import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index';
import VeeValidate from "vee-validate";
import BootstrapVue from 'bootstrap-vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../static/fontawesome/css/all.css'
import '../static/fontawesome/js/all'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ToggleButton from 'vue-js-toggle-button'
import locale from 'element-ui/lib/locale/lang/en'

export const bus = new Vue();

Vue.use(ToggleButton);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
