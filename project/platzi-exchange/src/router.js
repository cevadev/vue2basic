import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Error from "./views/Error.vue";
import CoinDetail from "./views/CoinDetail";

//indicamos a Vue que utilice el router
Vue.use(Router);

//exportamos una nueva instancia del Router
export default new Router({
  //utilizamos el history  de html
  mode: "history",
  //especificamos la configuraciones de las rutas de la app
  routes: [
    //cada ruta será un objeto, estas son las propiedades basicas que debe tener una ruta
    //relacionamos nuestra ruta home con el componente Home.vue
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    //compartimiento default cuando se quiere acceder a una ruta que no existe, llama al componente Error.vue
    {
      path: "*",
      name: "error",
      component: Error,
    },
    //ruta dinamica que mostrara la informacion detallada de una cripto
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetail,
    },
  ],
});
