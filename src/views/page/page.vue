<template>
  <div class="app-wrapper">
      <app-main></app-main>
  </div>
</template>

<script>
import AppMain from './components/AppMain'

export default {
  name: 'page',
  components: {
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
