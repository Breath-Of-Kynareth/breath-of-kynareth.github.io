<script setup lang="ts">
//import Homepage from './components/Homepage.vue'
//import Navigation from './components/Navigation.vue';
//import Welcome from './components/Welcome.vue';
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/test">test</router-link>
    </div>
    <router-view/>
  </div>
  <!--<Navigation />
  <Welcome />
  <Homepage />-->
</template>
