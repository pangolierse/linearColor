<template>
  <div class="linear-size-contain">
    <linear-size-item class="linear-size-contain__item" :init="50" :afterMoved="movedWidth" :left="syncLeft">Width：</linear-size-item>
    <linear-size-item class="linear-size-contain__item" :init="50" :afterMoved="movedHeight" :left="syncLeft">Height：</linear-size-item>
  </div>
</template>
<script>
  import LinearSizeItem from './LinearSizeItem'
  import {
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
  } from '@common/BusEventName'
  export default {
    name: 'LinearSize',
    props:['lock'],
    components:{
      LinearSizeItem,
    },
    data(){
      return{
        wPercent:40,
        hPercent:40,
        syncLeft:0,
      }
    },
    methods:{
      movedWidth(percent){
        if(this.lock){
          this.wPercent = this.hPercent = this.syncLeft = percent
          this.$bus.$emit(IMAGE_WIDTH,percent)
          this.$bus.$emit(IMAGE_HEIGHT,percent)
        }else{
          this.$bus.$emit(IMAGE_WIDTH,percent)
        }
      },
      movedHeight(percent){
        if(this.lock){
          this.wPercent = this.hPercent = this.syncLeft = percent
          this.$bus.$emit(IMAGE_WIDTH,percent)
          this.$bus.$emit(IMAGE_HEIGHT,percent)
        }else{
          this.$bus.$emit(IMAGE_HEIGHT,percent)
        }
      }
    }
  }
</script>
<style lang='less' scope>
.linear-size-contain{
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .linear-size-contain__item{
    flex-grow: 1;
  }
}
</style>