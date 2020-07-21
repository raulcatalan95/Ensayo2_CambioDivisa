<template>
  <div class="buscador">
    <div class="divisa container mt-5">
      <div class="Selector">
        <h5>Selecciona una Divisa</h5>
        <el-select v-model="selector" placeholder="Selecciona">
          <el-option
            v-for="(item, i) in Divisas"
            :key="i"
            :label="item.divisa.codigo"
            :value="item.divisa.codigo"
          >
          </el-option>
        </el-select>
      </div>
      <div class="ValorDivisa">
        <h5>Seleccione fecha</h5>
        <input type="date" class="inputdivisa" v-model="calendar" />
      </div>

      <div class="flecha">
        <p class="h2 mt-4"><b-icon icon="arrow-right"></b-icon></p>
      </div>
      <div class="PesoChile">
        <h5>Presione el Boton</h5>
        <button class="btn btn-primary" @click="valor">
          Cotizar por Fecha
        </button>
      </div>
    </div>

    <div
      class="tablaFecha container mt-5"
      v-for="(item, i) in Tabla.serie"
      :key="i"
      v-show="tablaDivisa"
    >
      <div class="ValorDivisa">
        <h5>Fecha</h5>
        <input type="text" class="inputtabla" v-model="SetCalendar" disabled />
      </div>
      <div class="selector">
        <h5>Divisa</h5>
        <input type="text" class="inputtabla" v-model="selector" disabled />
      </div>

      <div class="flecha">
        <p class="h2 mt-4"><b-icon icon="arrow-right"></b-icon></p>
      </div>

      <div class="PesoChile">
        <h5>Pesos Chilenos</h5>
        <input type="text" class="inputtabla" v-model="PesoChileno" disabled />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Buscador",

  data() {
    return {
      selector: "",
      calendar: "",
      Tabla: "",
      tablaDivisa: false,
      dolarPorFecha: "",
      peso: "",
    };
  },
  computed: {
    ...mapState(["Fecha", "Divisas", "Dolar"]),

    valorDivisa() {
      return this.selector;
    },

    SetCalendar() {
      let año = this.calendar.slice(0, 4);
      let mes = this.calendar.slice(5, 7);
      let dia = this.calendar.slice(8, 10);
      return `${dia}-${mes}-${año}`;
    },

    PesoChileno() {
      if (this.Tabla) {
        if (
          this.Tabla.codigo == "bitcoin" ||
          this.Tabla.codigo == "libra_cobre"
        ) {
          this.Tabla.serie.forEach((e) => {
            this.peso = e.valor;
          });
          axios
            .get(`https://mindicador.cl/api/dolar/${this.SetCalendar}`)
            .then((data) => {
              this.dolarPorFecha = data.data.serie[0].valor;
            });

          return "$" + this.peso * this.dolarPorFecha;
        } else {
          this.Tabla.serie.forEach((e) => {
            this.peso = e.valor;
          });
          return "$" + this.peso;
        }
      }
    },
  },
  methods: {
    valor() {
      this.peso = "";
      this.dolarPorFecha = "";
      this.tablaDivisa = true;
      axios
        .get(`https://mindicador.cl/api/${this.selector}/${this.SetCalendar}`)
        .then((data) => {
          this.Tabla = data.data;
        }).then(res=>{
          let fechadivisa= {
           fecha:this.calendar,
           divisa:this.selector,
           pesochileno:this.PesoChileno
          }
          this.$store.dispatch("setHistorial",fechadivisa)
        })
    },
  },
};
</script>
<style lang="scss">
.tablaFecha {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: #021d5d;
  color: #fff;
  border-radius: 20px;
  align-items: center;
}
.inputtabla {
  height: 40px;
  width: 90%;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
}
@media screen and (max-width: 500px){
  .tablaFecha{
    flex-direction: column;
   height: auto;
   padding: 20px;
  }
  .inputtabla{
     width: 90%;
  margin-top: 10px;
  }
}
</style>
