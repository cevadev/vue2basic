Vue.component("CoinDetail", {
  //el componente CoinDetail espera recibir una propiedad llamada coin que es un objeto que retorna nuestra
  //instancia de Vue.
  props: ["coin"],
  data() {
    return {
      showPrices: false,
      value: 0,
    };
  },

  //definicion de propiedades computadas
  computed: {
    title() {
      //las propiedades hijas que provienen del padre pertenecen al objeto coin
      return `${this.coin.name}-${this.coin.symbol}`;
    },
    //funcion que reacciona en base a los cambios que sufre la propiedad value
    convertedValue() {
      if (!this.value) {
        return 0;
      }
      return this.value / this.coin.price;
    },
  },

  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
    },
  },

  template: `
    <div>
      <img 
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      v-bind:src="coin.img" 
      v-bind:alt="coin.name">
      <h1
          v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
            {{ title }}
          <span v-if="coin.changePercent > 0">👍</span>
          <span v-else-if="changePercent < 0">😢</span>

          <span v-on:click="toggleShowPrices">
            {{ showPrices ? '🙈' : '🙉'}}
          </span>
      </h1>

      <!--two-way data binding-->
        <input type="number" v-model="value">
      <!--llalmamos a la propiedad computada convertedValue-->
        <span>{{'equivale a'}}: {{ convertedValue }} {{ 'bitcoin' }}</span>

      <ul v-show="showPrices">
        <li
          class="uppercase"
          v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price,  green: p.value > coin.price}"
          v-for="(p, i) in coin.pricesWithDays"
          v-bind:key="p.day">
            {{ i }} - {{ p.day }} - {{ p.value }}
        </li>
      </ul>
    </div>
  `,
});

new Vue({
  /**Propiedades de la instancia Vue: el, data(), methods, computed */
  el: "#app",
  data() {
    return {
      btc: {
        name: "Bitcoin",
        symbol: "BTC",
        img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        changePercent: 1,
        price: 8400,
        pricesWithDays: [
          { day: "Lunes", value: 8400 },
          { day: "Martes", value: 7900 },
          { day: "Miercoles", value: 8200 },
          { day: "Jueves", value: 9000 },
          { day: "Viernes", value: 9400 },
          { day: "Sabado", value: 10000 },
          { day: "Domingo", value: 10200 },
        ],
      },
    };
  },
  /*  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
    },
  }, */
});
