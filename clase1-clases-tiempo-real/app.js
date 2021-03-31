new Vue({
  el: "#app",

  data() {
    return {
      name: "Bitcoin",
      img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      //propiedad que representa el porcentaje de variacion del precio del bitcoin
      changePercent: 10,
      price: 8400,
      //definimos un array con los diferentes precios del bitcoin
      prices: [8400, 7900, 8200, 9000, 9400, 10000, 10200],
      //definimos un array de objetos
      pricesWithDays: [
        { day: "Lunes", value: 8400 },
        { day: "Martes", value: 7900 },
        { day: "Miercoles", value: 8200 },
        { day: "Jueves", value: 9000 },
        { day: "Viernes", value: 9400 },
        { day: "Sabado", value: 10000 },
        { day: "Domingo", value: 10200 },
      ],
      criptoCurrencies: ["Bitcoin", "Ethereum", "Litecoin", "NEO", "IOTA"],
      //propiedad showPrices controlamos cuando mostrar u ocultar la lista de precios
      showCurrencies: false,
      color: "f4f4f4",
    };
  },
  //definimos metodos
  methods: {
    toggleShowCurrencies: function () {
      this.showCurrencies = !this.showCurrencies;
      //this.color.split -> convierte a color en un array, luego aplicamos un reverse, reinvertimos los elementos
      //.join-> volvemos a concatenar los elementos del array
      this.color = this.color.split("").reverse().join("");
    },
  },
});
