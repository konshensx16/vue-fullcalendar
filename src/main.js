import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";

import modal from "vue-js-modal";

Vue.config.productionTip = false;
Vue.use(modal, { dialog: true, dynamic: true });

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
