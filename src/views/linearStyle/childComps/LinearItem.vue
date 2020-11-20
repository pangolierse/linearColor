<template>
  <div class="linear-style-item">
    <span class="num" ref="num"></span>
    <my-progress
      :afterMoved="moveProgress"
      v-bind="$attrs"
    ></my-progress>
    <color-btn v-on="$listeners"></color-btn> 
    <div class="locate">
      <!-- <span class="up" @click="upOrDown('up')"> < </span>
      <span class="down" @click="upOrDown('down')">></span> -->
      <span class="delete" @click="deleteMy">+</span>
    </div>
  </div>
</template>
<script>
  import MyProgress from '@components/common/progress/MyProgress'
  import ColorBtn from '@components/content/colorBtn/ColorBtn'
  import {SHOW_BOX_LINEAR} from '@common/BusEventName'
  export default {
    name: 'LinearItem',
    components:{
      MyProgress,
      ColorBtn,
    },
    data(){
      return{
        begin:null,
      }
    },
    methods:{
      moveProgress(percent){
        this.$refs.num.innerHTML = (percent*100).toFixed(0)
        this.begin = (percent*100).toFixed(0)
        this.$emit('linearDeg',this.begin)
      },
      upOrDown(type){
        this.$emit(type)
      },
      deleteMy(){
        this.$emit('delete')
      }
    }
  }
</script>
<style lang='less' >
  .linear-style-item{
    flex-grow: 1;
    display:flex;
    align-items:center;
    justify-content: space-around;
    padding: 0 20px;
    height: 40px;
    .num{
      width: 30px;
      font-weight: normal;
      margin-right: 10px;
    }
    .progress{
      width: 200px;
    }
    .locate{
      transform: rotate(45deg);
      margin-left: -15px;
      span{
        display: inline-block;
        cursor: pointer;
        font-weight: normal;
      }
      span:hover{
        color: @progressColor;
      }
      .up{
        transform: translateX(-1px);
      }
      .down{
        transform: translateX(1px);
      }
      .delete{
        font-size: 30px; 
      }
    }
  }
</style>