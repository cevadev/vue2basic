<template>
  <main>
    <px-header />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center"/>
    <!--<px-assets-table />
     <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Hello world Vue.js App"/> -->
  </main>
</template>

<script>
//importamos el componente Helloworld
//import HelloWorld from './components/HelloWorld.vue'

import PxHeader from './components/PxHeader.vue'
//import PxAssetsTable from './components/PxAssetsTable.vue'

/**
 * exportamos el objeto llamado app con un componente
 * na vez importado el componente, o declaramos dentro de la propiedad components
 * del componente padre app y asi estar disponibles para su uso dentro de template como en este caso. 
 */
export default {
  name: 'App',
  components: {
    PxHeader,
    //PxAssetsTable
    //HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
