<template>
  <div class="home">
     <h2 class="pt-5">Santiago {{ fechaaa }}</h2>
    <div class="divisa container mt-3">
     
        <div class="Selector">
          <h5>Selecciona una Divisa</h5>
          <el-select  v-model="selector" placeholder="Selecciona">
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
          <h5 v-if="selector != ''">{{ valorDivisa }}</h5>
          <h5 v-else>Divisa</h5>
          <input type="text" class="inputdivisa" v-model="divisa" />
        </div>

        <div class="flecha">
          <p class="h2 mt-4"><b-icon icon="arrow-right"></b-icon></p>
        </div>
        <div class="PesoChile">
          <h5>Pesos Chilenos</h5>
          <input type="text" class="inputpeso" v-model="Peso" disabled />
        </div>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      selector: "",
      divisa: 1,
      valordivisa: "",
    };
  },
  computed: {
    ...mapState(["Fecha", "Divisas","Dolar"]),

    Peso() {
      if (this.selector == "bitcoin" || this.selector == "libra_cobre") {
         this.Divisas.forEach((e) => {
          if (e.divisa.codigo == this.selector) {
            this.valordivisa = e.divisa.valor;
          }
        });
        let resultado1 = this.divisa!=''? "$" + parseInt(this.divisa) * this.Dolar * this.valordivisa : '';
        
        
        return resultado1;
        
      } else {
        this.Divisas.forEach((e) => {
          if (e.divisa.codigo == this.selector) {
            this.valordivisa = e.divisa.valor;
          }
        });
        let resultado =
          this.divisa !=''
            ? "$" + this.valordivisa * parseInt(this.divisa)
            : "";
        return resultado;
      }
    },

    valorDivisa() {
      return this.selector;
    },
    fechaaa() {
      return this.Fecha.slice(0, 10);
    },
  },
  methods: {},

  created() {
    let divisas = "";
    axios
      .get("https://mindicador.cl/api")
      .then((data) => {
        divisas = [
          { divisa: data.data.uf },
          { divisa: data.data.utm },
          { divisa: data.data.dolar },
          { divisa: data.data.euro },
          { divisa: data.data.libra_cobre },
          { divisa: data.data.bitcoin },
        ];
        this.$store.dispatch("setFecha", data.data.fecha);
        this.$store.dispatch("setDolar",data.data.dolar.valor )
       
      })
      .then((res) => {
        this.$store.dispatch("setDivisas", divisas);
      });
  },
};
</script>
<style lang="scss">

.divisa {
 display: flex;
 flex-direction: row;
  width: 100%;
  height: 110px;
  background-color: #021d5d;
  color: #fff;
  border-radius: 20px;
  align-items: center;
}
.Selector{
  width: 33%;
}
.ValorDivisa{
  width: 27%;
}
.flecha{
  width: 8%;
}
.PesoChile{
  width: 32%;
}
.inputdivisa {
  height: 40px;
  width: 90%;
  text-align: center;
   border-radius: 5px;
}
.inputpeso {
  height: 40px;
  width: 90%;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
}
@media screen and (max-width: 500px) {
 .divisa{
   flex-direction: column;
   height: auto;
   padding: 20px;
 }
 .flecha{
   display: none;
 }
 .Selector{
  width: 90%;
  margin-top: 10px;
}
.ValorDivisa{
  width: 90%;
   margin-top: 10px;
}

.PesoChile{
  width: 90%;
   margin-top: 10px;
}
.el-select{
  width: 90%;
}
}

</style>
