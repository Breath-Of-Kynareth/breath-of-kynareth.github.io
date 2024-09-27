<template>
  <div>
    <Navigation />
  </div>
  <div class='container'><img src='/BOKBanner.png' class="image-container"/></div>
</template>
  
  <script lang="ts">
  import Navigation from '../components/Navigation.vue';
  export default {
    components: { Navigation },
    setup() {

      return {
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    padding-top: 3em;
  }
  .image-container {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>