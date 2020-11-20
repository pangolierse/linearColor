<template>
  <div class="progress" ref="myProgress">
    <div class="progress-o" ref="myProgressBtn"></div>
  </div>
</template>

<script>
  import {movable,throttleDecorator} from '@common/utils.js'
  export default {
    name: 'myProgress',
    props:{
      afterMoved:{
        type:Function,
      },
      left:{
        type:Number,
        default(){
          return 0
        }
      },
      init:{
        default(){
          return undefined
        }
      }
    },
    mounted(){
      let el = this.$refs.myProgress
      let btn = this.$refs.myProgressBtn
      let afterMoved = this.afterMoved
      let Event = this
      movable(el,throttleDecorator(function(){
        Event.$emit('moving')
        let [e,location] = arguments
        let left = e.clientX - location.left
        if(left < 0)
          left = 0
        else if(left > this.offsetWidth)
          left = this.offsetWidth
        btn.style.width = left + 'px'
        let percent = Math.round(left/this.offsetWidth*100)/100
        afterMoved && afterMoved(percent)
        Event.$emit('moved')
      },1000/60))
      this.$nextTick(() => {
          if(this.init !== undefined){
            btn.style.width = el.offsetWidth * (this.init / 100) + 'px'
            afterMoved && afterMoved(this.init / 100)
          }else{
            afterMoved && afterMoved(0.5)
            btn.style.width = el.offsetWidth * (0.5) + 'px'
          }
      })
    },
    methods:{
    },
    watch:{
      left: function(val){
        let el = this.$refs.myProgress
        let btn = this.$refs.myProgressBtn
        btn.style.width = el.offsetWidth * val + 'px'
      }
    }
  }
</script>

<style lang="less">
  .progress{
    @progressHeight:8px;
    @progressWidth:200px;
    width: @progressWidth;
    height: @progressHeight;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    .progress-o{
      height: @progressHeight;
      width: 50%;
      display: block;
      background-color: @progressColor;
      border-radius: 10px;
    }
    .progress-o::after{
      content: '';
      height: 16px;
      width: 16px;
      background-color: @progressColor;
      border-radius: 50px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%,-50%);
      box-shadow: 0 0 1px 2px black;
    }
  }
</style>