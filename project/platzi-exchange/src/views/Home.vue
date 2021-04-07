<template>
  <div>
    <px-assets-table v-bind:assets="assets"/>
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";
//import de la api que se comunica con coincap
import api from '../api.js';

export default {
  name: "Home",
  components: { PxAssetsTable },
  //propiedad data que almacena los asstes que retorna la api de coincap
  data(){
    return {
      //arraglo con la lista de monedas o assets de coincap. este listado de ser pasado al componente px-assets-table
      assets: []
    }
  },

  //utilizamos el hook de vue created() el cual se ejecuta cuando se crea un componente de vue
  created(){
    api.getAssets()
      .then(assets => (this.assets = assets))
  }
};
</script>