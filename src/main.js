import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ELEMENT UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//BOOTSTRAP VUE
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//FIREBASE

import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCwtmflg-eiMkpjZf2URjnnigRTfbv6G-A",
  authDomain: "calcularmoneda.firebaseapp.com",
  databaseURL: "https://calcularmoneda.firebaseio.com",
  projectId: "calcularmoneda",
  storageBucket: "calcularmoneda.appspot.com",
  messagingSenderId: "244918193548",
  appId: "1:244918193548:web:d29c17776ed918e9dc1aa9",
  measurementId: "G-R2KFP6BEPG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
