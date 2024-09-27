<template>
  <div class="video-background">
    <video autoplay loop muted playsinline class="background-video">
      <source src="../assets/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <div id="app">
    <router-view/>
  </div>
  <notifications position="top center" max="3" />
</template>

<style scoped>

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

</style>