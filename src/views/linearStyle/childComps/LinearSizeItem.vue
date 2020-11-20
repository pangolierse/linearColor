<template>
  <div class="linear-size-contain__item">
    <span><slot></slot></span>
    <my-progress v-bind="$attrs"></my-progress>
  </div>
</template>
<script>
  import MyProgress from '@components/common/progress/MyProgress'
  export default {
    name: 'LinearSizeItem',
    components:{
      MyProgress,
    },
  }
</script>
<style lang='less' scope>
.linear-size-contain__item{
  display: flex;
  height: 40px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  &>.progress{
    flex: 1;
    margin: 0 5px;
  }

}
</style>