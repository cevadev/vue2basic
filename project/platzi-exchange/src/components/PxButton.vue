<template>
    <!--la directiva v-on:click se puede cambiar por @click-->
  <button
    v-on:click="buttonClick"
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
  >
  <!--slot para reemplazar el contenido por algun texto que deseamos-->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PxButton',

  methods: {
      //handler para el momento de hacer click en el button 
    buttonClick() {
        //emitimos un evento para que el padre al momento de utlizar el boton pueda manejar el evento interno del boton
      this.$emit('custom-click')
    }
  }
}
</script>
