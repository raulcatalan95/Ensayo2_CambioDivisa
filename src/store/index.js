import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Fecha:'',
    Divisas:'',
    Dolar:'',
    Historial:[],
  },
  mutations: {
    SET_FECHA(state,fecha){
      state.Fecha=fecha;
    },
    SET_DIVISAS(state,divisa){
      state.Divisas=divisa;
    },
    SET_DOLAR(state,dolar){
      state.Dolar=dolar;
    },
    SET_HISTORIAL(state,divisafecha){
    state.Historial.push(divisafecha)
    }
  },
  actions: {
    setFecha({commit},fecha){
      commit('SET_FECHA',fecha)
    },
    setDivisas({commit},divisa){
      commit('SET_DIVISAS',divisa)
    },
    setDolar({commit},dolar){
      commit('SET_DOLAR',dolar)
    },
    setHistorial({commit},divisafecha){
    commit('SET_HISTORIAL',divisafecha)
    }
  },
  modules: {
  }
})
