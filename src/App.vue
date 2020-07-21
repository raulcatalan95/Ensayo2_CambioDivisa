<template>
  <div id="app">
  <b-navbar toggleable class="navegacion" type="dark" >
    <b-navbar-brand :to="{name: 'Home'}">Moneda</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template v-slot:default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{name: 'buscador'}">Cotiza por Fecha</b-nav-item>
        <b-nav-item :to="{ name: 'historial' }">Historial</b-nav-item>
        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
   background-image: url(assets/fondo_moneda.jpg);
  color: #fff;
  min-height: 600px;
  width: 100%;
}

.navegacion{
  background-color: #021d5d;
 
}
</style>
