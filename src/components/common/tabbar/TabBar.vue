<template>
  <ul class="tab-bar">
    <slot></slot>
  </ul>
</template>

<script>
  import TabBarItem from './TabBarItem'
  export default {
    name: 'TabBar',
  }
</script>

<style lang="less">
.tab-bar{
  width: 100%;
  height: @navHeight;
  box-shadow: 0 20px 5px -20px rgb(0, 0, 0);
  position: absolute;
  border-radius: 40px 40px 0 0 ;
  display: flex;
  top: 0;
  z-index: 9;
}
</style>