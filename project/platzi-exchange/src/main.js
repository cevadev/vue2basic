import Vue from "vue";
import App from "./App.vue";
/**
 * importamos el archivo tailwind.css
 * el @ nos permite hacer referencia de manera relativa al directorio src
 */
import "@/assets/css/tailwind.css";

import router from "./router.js";
import { dollarFilter, percentFilter } from "./filters.js";

import Chart from "chart.js";
import Chartick from "vue-chartkick";
import { VueSpinners } from "@saeris/vue-spinners";

//utilizamos los componentes terceros
Vue.use(VueSpinners);
Vue.use(Chartick.use(Chart));
Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = false;

new Vue({
  //indicamos a view que utilice el router
  router: router,
  render: (h) => h(App),
}).$mount("#app");
