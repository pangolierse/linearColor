<template>
  <li class="tab-bar__item" @click="tabClick">
    <span>{{title.value}}</span>
  </li>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props:{
      title:{
        type:Object,
        required:true,
      }
    },
    methods:{
      tabClick(){
        this.$emit('tab-click',this.title.index)
      }
    },
  }
</script>

<style lang="less">
  .tab-bar__item{
    text-align: center;
    line-height: 48px;
    flex-grow: 1;
  }
  .tab-bar__item:hover{
    cursor: pointer;
  }
</style>