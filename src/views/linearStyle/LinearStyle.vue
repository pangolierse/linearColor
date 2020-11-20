<template>
  <div id="linearStyle" class="linear-style">
    <linear-item 
    v-for="(value,index) in itemKey"
    :key="value"
    @linearDeg="linearDeg($event,index)"
    @colorChange="colorChange($event,index)"
    @up="itemUp"
    @down="itemDown"
    @delete="deleteMy(index)"
    :init="getInit(value)"
    ></linear-item>
    <div class="linear-optio-contain">
      <linear-size :lock="lock"></linear-size>
      <linear-option
      @create="create"
      @isLock="isLock($event)"
      ></linear-option>
    </div>
  </div>
</template>
<script>
  import LinearItem from './childComps/LinearItem'
  import LinearOption from './childComps/LinearOption'
  import LinearSize from './childComps/LinearSize'
  import {
    INIT_BOX_LINEAR,
    SHOW_BOX_LINEAR_COLOR,
    SWAP_COLOR,
    DELETE_COLOR,
  } from '@common/BusEventName'
  export default {
    name: 'LinearStyle',
    components:{
      LinearItem,
      LinearOption,
      LinearSize,
    },
    data(){
      return{
        colors:[],
        itemKey:[0,1],
        nowItemIndex:2,
        lock:false,
      }
    },
    methods:{
      linearDeg(percent,index){
        this.colors[index].percent = percent
      // ShowBox on
        this.$bus.$emit(SHOW_BOX_LINEAR_COLOR)
      },
      colorChange(color,index){
        if(this.colors.length - 1 < index){
          this.colors.push(color)
           // ShowBox on
          this.$bus.$emit(INIT_BOX_LINEAR, color,index)
        }else{
          // ShowBox on
          this.$bus.$emit(SHOW_BOX_LINEAR_COLOR)
        }
      },
      itemUp(){
        
      },
      itemDown(){
        console.log('down');
      },
      deleteMy(index){
        if(this.colors.length > 2){
          this.colors.splice(index,1)
          this.itemKey.splice(index,1)
          // ShowBox on
          this.$bus.$emit(DELETE_COLOR,index)
        }else{
          alert('至少需要两个颜色才能使用渐变色')
        }
      },
      create(){
        if(this.colors.length == 5){
          alert('最多只能有五个颜色')
        }else{
          this.itemKey.push(this.nowItemIndex++)
        }
      },
      getInit(value){
        if(value * 20 > 100){
          value = 100
        }else{
          value = value*20
        }
        return value
      },
      isLock(lock){
        this.lock = lock
      }
    }
  }
</script>
<style lang='less' scope>
  .linear-style{
    margin-top: @navHeight;
    width: 500px;
    padding: 10px 10px;
    // overflow: hidden;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .linear-optio-contain{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 30px;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>