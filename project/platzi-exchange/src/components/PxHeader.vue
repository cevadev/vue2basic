<template>
   <!--el header toma todo el ancho de la pantalla con shadow de css-->
   <header class="shadow w-screen">
       <nav>
           <!--usamos flex para disponer la ubicacion de los elementos con color de fondo green-->
           <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
               <div class="flex items-center flex-shrink-0 text-white mr-6">
                   <px-icon class="mr-2"/>
                   <router-link v-bind:to="{ name: 'home'}" class="font-semibold text-xl tracking-tight">
                       PlatziExchange
                   </router-link>
               </div>
               <!--sm:block -> tilwind aplicara la clase block solo con tamaño de pantalla que corresponde a sm-->
               <div class="hidden sm:block w-full blok flex-grow lg:flex lg:items-center lg:wauto">
                   <div class="text-sm lg:flex-grow"></div>
               </div>
           </nav>
       </nav>
    </header> 
</template>

<script>
import PxIcon from './PxIcon.vue'
export default {
    name: 'PxHeader',
    components: {
        PxIcon
    }
}
</script>