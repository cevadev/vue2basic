<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in assets" v-bind:key="a.id"
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
