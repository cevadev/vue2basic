<template>
  <div>
    <!--llamamos al componente bounce-loader-->
    <bounce-loader v-bind:loading="isloading" v-bind:color="'#68d391'" v-bind:size="100" />
    <!--mostramos la tabla de datos si loading is false-->
    <px-assets-table v-if="!isloading" v-bind:assets="assets"/>
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
      //isloading -> que cargue o muestre el spinner mientra los datos se recuperan o cargan de la api
      isloading: false,
      //arraglo con la lista de monedas o assets de coincap. este listado de ser pasado al componente px-assets-table
      assets: []
    }
  },

  //utilizamos el hook de vue created() el cual se ejecuta cuando se crea un componente de vue
  created(){
    //mientras se crea el componente
    this.isloading = true
    api.getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => this.isloading = false)
  }
};
</script>