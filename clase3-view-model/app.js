new Vue({
  /**Propiedades de la instancia Vue: el, data(), methods, computed */
  el: "#app",
  data() {
    return {
      name: "Bitcoin",
      symbol: "BTC",
      img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      changePercent: 0,
      price: 8400,
      showPrices: false,
      value: 0,
      pricesWithDays: [
        { day: "Lunes", value: 8400 },
        { day: "Martes", value: 7900 },
        { day: "Miercoles", value: 8200 },
        { day: "Jueves", value: 9000 },
        { day: "Viernes", value: 9400 },
        { day: "Sabado", value: 10000 },
        { day: "Domingo", value: 10200 },
      ],
    };
  },
  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
    },
  },
  //definicion de propiedades computadas
  computed: {
    title() {
      return `${this.name}-${this.symbol}`;
    },
    //funcion que reacciona en base a los cambios que sufre la propiedad value
    convertedValue() {
      if (!this.value) {
        return 0;
      }
      return this.value / this.price;
    },
  },
  watch: {
    //watcher para saber cada que cambia showPrices
    showPrices(newVal, oldVal) {
      console.info(newVal, oldVal);
    },
  },
});
