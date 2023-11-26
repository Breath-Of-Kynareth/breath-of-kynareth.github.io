<template>
  <div>
    <Navigation />
  </div>
  <div class='container'><img src='/BOKBanner.png'/></div>
  <div class='container'>
    <iframe width="1000" height="500" src="https://www.youtube.com/embed/videoseries?si=0RhCNs2aDjX2USNY&amp;list=PL-z7L6gs44NO9Nn8XzgAxH-mdLIIUXq9D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
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
  }
</style>