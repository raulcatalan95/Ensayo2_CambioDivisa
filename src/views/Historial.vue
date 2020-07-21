<template>
    <div class="historial">
    <h1 v-if="Historial.length==0">el historial esta vacio</h1>
     <div
     v-else
      class="tablaFecha container mt-5"
      v-for="(item, i) in Historial"
      :key="i"
      
    >
      <div class="ValorDivisa">
        <h5>Fecha</h5>
        <input type="text" class="inputtabla" v-model="item.fecha" disabled />
      </div>
      <div class="selector">
        <h5>Divisa</h5>
        <input type="text" class="inputtabla" v-model="item.divisa" disabled />
      </div>

      <div class="flecha">
        <p class="h2 mt-4"><b-icon icon="arrow-right"></b-icon></p>
      </div>

      <div class="PesoChile">
        <h5>Pesos Chilenos</h5>
        <input type="text" class="inputtabla" v-model="item.pesochileno" disabled />
      </div>
    </div>
        
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
data() {
    return {
     
    }
},
computed: {
 ...mapState(["Fecha", "Divisas", "Dolar","Historial"]),
},
 methods: {
 
 }
}
</script>
<style lang="scss">
.historial{
    height: auto;
}
.Historialvacio{
  color: #fff;
}
</style>