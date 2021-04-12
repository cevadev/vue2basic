<template>
  <div class="flex-col">
    <!--incluimos el componete de tercero vue spinner-->
    <div>
      <bounce-loader v-bind:loading="isLoading" v-bind:color="'#68d391'" v-bind:size="100" />
    </div>
      <!--si isLoading false (terminó la carga) construimod el html-->
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            v-bind:src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            v-bind:alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Cambiar</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <!--mostramos un grafico en base al historial del precio de las monedas
          min, max, chartData propiedades computadas-->
      <line-chart
        class="my-10"
        v-bind:colors="['orange']"
        v-bind:min="min"
        v-bind:max="max"
        v-bind:data="chartData"
      />

      <!--mostramos la lista de Exchanges donde m representa un exchange de markets-->
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" v-bind:key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>
            {{ m.priceUsd | dollar}}
          </td>
          <td>
            {{ m.baseSymbol }} / {{ m.quoteSymbol }}
          </td>
          <td>
            <!--el boton solo se mostrará cuando el market tiene url, si el market no tiene url
                mostramos el link con el m.url-->
            <px-button v-on:is-loading="m.isLoading || false" v-if="!m.url" v-on:custom-click="getWebSite(m)">
              <slot>Obtener Link</slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">{{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from '../api';
import PxButton from '../components/PxButton.vue'

export default {
  name: 'CoinDetail',

  data() {
    return {
      isLoading: false,
        //la propiedad asset se carga con datos que viene del api
      asset: {},
      history: [],
      markets: []
    }
  },

  components: { PxButton },

  computed: {
      //calculamos los valores min max avg con los valores del array history
    min() {
        //... spread operator tomamos el array de history y le pasamos cada elemento para map calcule el minimo 
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
        return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
    },

    chartData() {
      const data = []
      this.history.map(h => {
        data.push([h.date, parseFloat(h.priceUsd).toFixed(2)])
      })
      return data
}
  },

  //cuando el componente se crea se llama a la funcion getCoin
  created() {
    this.getCoin()  
  },

  methods: {
    //metodo que obtiene de la api toda la información relacionada con el exchange, dentro de la info esta la url
    getWebSite(exchange){
       this.$set(exchange, 'isLoading', true);
      return api.getExchange(exchange.exchangeId)
        .then(res => {
          //el valor de la url del exchange lo asignamos al exchange local, que lo tenemos guardado dentro del 
          //componente
          
          //this.$set nos ayuda a reslver los problemas de reactividad que tiene vue, este problema surge cuando
          //intentamos agregar propiedades que no existen en el objeto desde el principio de su creacion, es decir,
          //propiedades que no se establecieron en data o que no se establecieron cuando el objeto fue creado
          
          //recibe-> el objeto, el nombre de propiedad y valor de la propiedad
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => {
          //cambiamos el valor de la propiedad isLoading
          this.$set(exchange, 'isLoading', false)
        })
    },

      //metodo que recupera los datos de la moneda
    getCoin() {
        //el id es parte de la url, con la funcionalidad $route se agrega a cada componente de vue cuando trabajamos con router
        //$route representa a la ruta y toda la info de la ruta, aqui accedemos a los parametros
      const id = this.$route.params.id
      
      //mostramos que el spinner se cargue
      this.isLoading = true;
      //Promise.all nos permite ejecutar varias promesas al mismo tiempo a traves de un array
      Promise.all(
          //llamamos a nuestras funciones
          [api.getAsset(id), api.getAssetHistory(id), api.getMarkets(id)])
          //obtenemos un array con los asset y history
          .then(([asset, history, markets]) => {
              //mapeamos el array asset con la variable asset y el array history con la variable history
          this.asset = asset
          this.history = history
          this.markets = markets
        }
      )
      //ocultamos el spinner
      .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
