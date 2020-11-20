<template>
  <div class="touch-pad" ref="touchPad">
    <div class="cursor" ref="cursor" ></div>
  </div>
</template>

<script>
  import {movable,throttleDecorator} from '@common/utils'
  export default {
    name: 'TouchPad',
    props:{
      afterMoved:{
        type:Function,
      },
      locaLeft:{
        type:Number,
        default(){
          return 0
        }
      },
      locaTop:{
        type:Number,
        default(){
          return 0
        }
      },
    },
    mounted(){
      let touchPad = this.$refs.touchPad
      let cursor = this.$refs.cursor
      let afterMoved = this.afterMoved
      let location = this.location
      let Event = this
      movable(touchPad,throttleDecorator(function(){
        Event.$emit('moving')
        let [e,location] = arguments
        let left = e.clientX - location.left
        let top = e.clientY - location.top
        if(top < 0)
          top = 0
        else if(top > this.offsetHeight)
          top = this.offsetHeight
        if(left < 0)
          left = 0
        else if(left > this.offsetWidth)
          left = this.offsetWidth
        cursor.style.left = left - cursor.offsetWidth/2 + 'px'
        cursor.style.top = top - cursor.offsetHeight/2 + 'px'
        afterMoved && afterMoved({
          leftPercent: Math.round(left / this.offsetWidth * 100),
          topPercent: Math.round(top / this.offsetWidth * 100)
        })
        //custom
        Event.$emit('moved')
      },1000/60))
    },
    watch: {
      locaTop: function(val, oldVal){
        let touchPad = this.$refs.touchPad
        let cursor = this.$refs.cursor
        cursor.style.top = val*touchPad.offsetHeight - cursor.offsetHeight/2 + 'px'
      },
      locaLeft: function(val){
        let touchPad = this.$refs.touchPad
        let cursor = this.$refs.cursor
        cursor.style.left = val*touchPad.offsetWidth - cursor.offsetWidth/2 + 'px'
      }
    }
  }
</script>

<style scoped lang="less">
.touch-pad{
  width: 100%;
  height: 150px;
  background-color: #5F8B9B;
  position: relative;
  cursor: pointer;
  .cursor{
    height: 8px;
    width: 8px;
    position: absolute;
    top: 40px;
    left: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid rgba(0,0,0,0.5);
    z-index: 999;
  }
}
</style>