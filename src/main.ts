import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import appConfig from "./config/app.config";
import axios from "axios";
import VueAxios from "vue-axios";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.appConfig = appConfig;
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
