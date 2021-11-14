<template>
  <div id="app">
    <vue-particles
     color="#409EFF"
     :particleOpacity="0.7"
     :particlesNumber="100"
     shapeType="circle"
     :particleSize="4"
     linesColor="#409EFF"
     :linesWidth="1"
     :lineLinked="true"
     :lineOpacity="0.4"
     :linesDistance="150"
     :moveSpeed="3"
     :hoverEffect="true"
     hoverMode="grab"
     :clickEffect="true"
     clickMode="push">
    </vue-particles>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
</style>
