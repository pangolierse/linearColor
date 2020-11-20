<template>
  <div class="box-option" ref="boxOption">
    <tab-bar>
      <tab-bar-item v-for="(value,index) in tabName" 
      :key="index" 
      :title="{value,index}" 
      @tab-click="tabClick"
      :class="{'is-active': currentIndex === index}"
      ></tab-bar-item>
    </tab-bar>
    <keep-alive>
      <component :is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
  import TabBar from '@components/common/tabbar/TabBar'
  import TabBarItem from '@components/common/tabbar/TabBarItem'
  import BoxStyle from '@views/boxStyle/BoxStyle'
  import LinearStyle from '@views/linearStyle/LinearStyle'
  import {Color,createBoxShadow} from '@common/Color'
  import {BOX_OPTION_PUITY} from '@common/BusEventName'
  export default {
    name: 'BoxOption',
    components:{
      TabBar,
      TabBarItem,
      BoxStyle,
      LinearStyle,
    },
    data(){
      return {
        tabName:[
          'BoxStyle',
          'LinearStyle',
        ],
        componentName:[
          'box-style',
          'linear-style',
        ],
        currentIndex: 0,
      }
    },
    mounted(){
      let boxOption = this.$refs.boxOption
      // colorSmall emit
      this.$bus.$on(BOX_OPTION_PUITY,function(color){
        boxOption.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
        boxOption.style.boxShadow = createBoxShadow(color.h,color.sv,color.v,27)
      })
    },
    computed:{
      currentTabComponent(){
        return this.componentName[this.currentIndex]
      },
    },
    methods:{
      
      tabClick(index){
        this.currentIndex = index
      }
    }
  }
</script>

<style lang="less">
  .box-option{
    width: 500px;
    border-radius: 40px;
    .is-active{
      color: black;
    }
  }
</style>