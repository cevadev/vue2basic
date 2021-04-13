<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <!--llamamos a la clase up y down segun el valor de sortOrder definidas en el css style abajo-->
        <th v-bind:class="{ up: this.sortOrder === 1, down: this.sortOrder === -1}">
          <span class="underline cursor-pointer" v-on:click="changeSortOrder">Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"/>
        </td>
      </tr>
    </thead>
    <tbody>
      <!--mostramos los elemento que estan en filtered y ya no en assets
      <tr v-for="a in assets" v-bind:key="a.id"-->
      <tr v-for="a in filteredAssets" v-bind:key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100">
        <td>
          <img class="w-6 h-6"
            v-bind:src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`" v-bind:alt="a.name">
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link class="hover:underline text-green-600"
            v-bind:to="{ name: 'coin-detail', params: { id: a.id}}">
            {{ a.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ a.symbol }}</small>
        </td>
        <td>
          {{ a.priceUsd | dollar}}
        </td>
        <td>
          {{ a.marketCapUsd | dollar}}
        </td>
        <!--si el valor es negativo lo pintamos de rojo, de lo contratio de verde-->
        <td v-bind:class="a.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600'">
          {{ a.changePercent24Hr | percent}}
        </td>
        <td class="hidden sm:block">
          <!--custom:click hace referencia al evento emitido por el componente PxButton-->
          <px-button v-on:custom-click="goToCoin(a.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '../components/PxButton.vue'
export default {
  name: "PxAssetsTable",
  //registramos el componente
  components: { PxButton },

  data(){
    return{
      filter: '',
      sortOrder: 1
    }
  },

  computed: {
    //dentro del input, y en base al valor dentro del input filtramos la lista de assets
    //filtramos la lista de assets siempre y cuando filter tenga un valor
    filteredAssets(){
      //altOrder variable que es lo contrario al sortOrder
      const altOrder = this.sortOrder === 1 ? -1 : 1
      
      //si filter no tiene valor
      /* if(!this.filter){
        return this.assets
      } */
      
      //si filter tiene valor, utilizamos la funcion filter de un array para filtrar las coincidencias
      //funcion que busca una coincidencia en base al valor que tenemos en el filtro 
      //si algun elemento dentro de la lista de assets coincide en su propiedad symbol con lo que esta dentro de la
      //propieda filter dentro del input devolvemos todos esos elementos
      return this.assets.filter(
        a => a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
             a.name.toLowerCase().includes(this.filter.toLowerCase())
      )
      //sort(a,b): a-> elemento actual b-> elemento con el que se va a comparar
      .sort((a,b) =>{
        //verificamos si el elemento tiene un raking mayor o menor al elemento anterior
        if(parseInt(a.rank) > b.rank){
          return this.sortOrder
        }
        return altOrder;
      })
    }
  },

  /**
   * por cada criptomoneda que recibe, la propiedad assets que va a recibir las coins del API
   */
  props: {
    assets: {
      type: Array,
      //definimos un valor por defecto que es un function que retorna un array vacio para el caso de un objeto seria {}
      default: () => []
    }
  },
  methods: {
      //handler para el boton detalle
      goToCoin(id){
        //el objeto $router accede a la instancia del router y se utiliza para navegar a traves de código
        //push() empujamos una nueva ruta dentro del stack de rutas de router
        this.$router.push({ name: 'coin-detail', params: { id }});
      },

      changeSortOrder(){
        //cambiamos el valor de sortOrder
        this.sortOrder = this.sortOrder === 1 ? -1 : 1
      }
  }
};
</script>

<!--styles scoped los stilos se aplican unicamente a los elementos html que estan dentro de PxAssetsTable-->
<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
