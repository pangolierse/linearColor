<template>
  <div class="box-style-item">
    <span class="item-name"><slot></slot></span>
    <my-progress v-bind="$attrs" :afterMoved="afterMoved" class="progress" ></my-progress>
  </div>
</template>

<script>
  import MyProgress from '@components/common/progress/MyProgress'
  export default {
    name: 'BoxStyleItem',
    props:{
      afterMoved:Function,
    },
    components:{
      MyProgress,
    },
  }
</script>

<style lang="less">
  .box-style-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    
    &>.progress{
      flex-grow: 1;
    }
  }
</style>