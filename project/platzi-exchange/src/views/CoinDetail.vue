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
    </template>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'CoinDetail',

  data() {
    return {
      isLoading: false,
        //la propiedad asset se carga con datos que viene del api
      asset: {},
      history: []
    }
  },

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
          [api.getAsset(id), api.getAssetHistory(id)])
          //obtenemos un array con los asset y history
          .then(([asset, history]) => {
              //mapeamos el array asset con la variable asset y el array history con la variable history
          this.asset = asset
          this.history = history
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
