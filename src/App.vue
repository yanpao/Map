<template>
  <div id="app">
    <MapView/>
  </div>
</template>

<script>
import MapView from './Map.vue'

export default {
  name: 'App',
  components: {
    MapView
  }
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.ol-zoom-extent button{
    background: url('assets/home.png')no-repeat 50% 50%;
    background-size: 20px 20px;
    background-color:beige
}
</style>


