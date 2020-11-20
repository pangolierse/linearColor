<template>
  <div id="app"  ref="colorDesigner">
    <div class="title">
      <h1>DIY BoxColor
      <br>
      <span>Generate CSS code</span>
      </h1>
    </div>
    <div class="container">
      <div class="contain-left">
        <show-box></show-box>
      </div>
      <box-option class="contain-right"></box-option>
    </div>
  </div>
</template>
<script>
import ShowBox from '@components/content/ShowBox/ShowBox'
import BoxOption from '@components/content/BoxOption/BoxOption'
import ColorBtn from '@components/content/colorBtn/ColorBtn'
import {COLOR_DESIGNER} from '@common/BusEventName'
export default {
  name: 'App',
  components:{
    ShowBox,
    BoxOption,
    ColorBtn,
  },
  mounted(){
    let color = this.$store.getters.puityColor
    let colorDesigner = this.$refs.colorDesigner
    colorDesigner.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
    // BoxStyle emit
    this.$bus.$on(COLOR_DESIGNER, color => {
      colorDesigner.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
    })
  }
}
</script>

<style lang="less">
@import "./assets/styles/css/normalize.css";
@import "./assets/styles/css/theme.css";
html,body{
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0 100px;
  @media screen and (min-height:800px){
    justify-content: center;
  }
  &>.title{
    h1{
      span{
        font-size: 20px;
      }
    }
    margin-bottom: 50px;
    text-align: center;
  }
  .container{
    display: flex;
    margin-bottom: 70px;
    .contain-left{
      width: 600px;
      height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
      @media screen and (max-width: 1200px) {
        margin-right: 30px;
        height: 500px;
        width: 500px;
      } 
    }
    .contain-right{
      display: flex;
      @media screen and (max-width: 1200px) {
        width: 400px;
      } 
    }
  }
  .isActive{
    visibility: hidden;
  }
}
</style>
