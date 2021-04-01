Vue.component("counter", {
  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    //incrementamos el valor de counter
    increment() {
      this.counter += 1;
    },
  },

  template: `
    <div>
     <button v-on:click="increment">Click me!</button>
     <span>{{ counter }}</span>
    </div>
  `,
});

new Vue({
  el: "#app",

  data() {
    return {
      title: "Hola",
    };
  },
});
