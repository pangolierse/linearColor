<template>
  <div class="box-style">
    
    <div class="box-style-item">
      <span>ColorSelect:</span>
    <color-btn
      @colorChange="colorChange($event)"
      :init="'458F8F'"
    ></color-btn>
    </div>
    <box-style-item :afterMoved="boxSize" :init="70">Size：</box-style-item>
    <box-style-item :afterMoved="boxRadius">Radius：</box-style-item>
    <box-style-item :afterMoved="shadowDis" :init="20">Distance：</box-style-item>
    <box-style-item :afterMoved="hueRotate" :init="0">HueRotate：</box-style-item>
    <pre ref="pre">
        <div class="mask" ref="mask"> COPY SUCCESS</div>
        <div class="copy" @click="copy">COPY</div>
        <span class="property">width: </span> <span class="value" >{{width}}px;</span><br>
        <span class="property">height: </span> <span class="value">{{height}}px;</span><br>
        <span class="property">border-radius: </span> <span class="value">{{borderRadius}}px;</span><br>
        <span class="property">background-color: </span> <span class="value" >{{backgroundColor}};</span><br>
        <span class="property">filter: </span> <span class="value">{{filter}};</span><br>
        <span class="property">box-shadow: </span> <span class="value">{{boxShadow}};</span><br>
        <span class="property">background-size: </span> <span class="value">{{backgroundSize}};</span><br>
        <span class="property">background-image: </span> <span class="value">{{backgroundImage}};</span>
        <textarea ref="copy_text" name="" id="" cols="300" rows="100"></textarea>
    </pre>
  </div>
</template>

<script>
  import BoxStyleItem from './childComps/BoxStyleItem'
  import ColorBtn from '@components/content/colorBtn/ColorBtn'
  import {getPageLocate} from '@common/utils'
  import {
    SHOW_BOX_PUITY,
    BOX_OPTION_PUITY,
    COLOR_DESIGNER,

    BOX_RADIUS,
    BOX_SIZE,
    BOX_DISTANCE,
    BOX_HUEROTATE,

    CHANGE_PROPERTY,
  } from '@common/BusEventName'
  export default {
    name: 'BoxStyle',
    components:{
      BoxStyleItem,
      ColorBtn,
    },
    data(){
      return{
        width:'',
        height:'',
        borderRadius:'',
        backgroundColor:'',
        filter:'',
        backgroundSize:'',
        boxShadow:'',
        backgroundImage:'',
        cssProperty:['borderRadius','backgroundColor','backgroundSize','boxShadow','backgroundImage','filter'],
      }
    },
    mounted(){
      // emit ShowBox
      this.$bus.$on(CHANGE_PROPERTY,(el) => {
        this.width = el.offsetWidth
        this.height = el.offsetHeight
        this.cssProperty.forEach( (value)=>{
          this[value] = el.style[value]
        })
      })
      this.$refs.mask.addEventListener('transitionend',function(){
        this.style.visibility = 'hidden'
      })
    },
    methods:{
      boxSize(percent){
        // on ShowBox
        this.$bus.$emit(BOX_SIZE,percent)
      },
      boxRadius(percent){
        // on ShowBox
        this.$bus.$emit(BOX_RADIUS,percent)
      },
      shadowDis(percent){
        // on ShowBox
        this.$bus.$emit(BOX_DISTANCE,percent)
      },
      colorChange(color){
        //提交事件总线通知全体变色
        // on ShowBox
        this.$bus.$emit(SHOW_BOX_PUITY,color)
        // on BoxOption
        this.$bus.$emit(BOX_OPTION_PUITY,color)
        // on ColorDesigner
        this.$bus.$emit(COLOR_DESIGNER,color)
      },
      hueRotate(percent){
        // on ShowBox
        this.$bus.$emit(BOX_HUEROTATE,percent)
      },
      copy(){
        let textarea = this.$refs.copy_text
        let mask = this.$refs.mask
        textarea.style.visibility = 'visible'
        mask.style.visibility = 'visible'

        this.$refs.copy_text.value = this.$refs.pre.innerText
        this.$refs.copy_text.select()
        document.execCommand('copy')        
        textarea.style.visibility = 'hidden'
      }
    }
  }
</script>
<style lang="less">
  .box-style{
    margin-top: @navHeight;
    width: 500px;
    padding: 10px 10px;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .box-style-item{
      display: flex;
      flex-grow: 1;
      height: 40px;
    }
    &>pre{
      position: absolute;
      overflow: hidden;
      left: 0;
      right: 0;
      bottom: 30px;
      height: 200px;
      background-color:rgb(29, 31, 33);
      margin: 0 20px;
      padding: 30px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: normal;
      word-wrap: break-all;
      word-break: normal;
      white-space: normal;
      .copy{
        position: absolute;
        width: 50px;
        height: 20px;
        border-radius: 30px;
        right: 10px;
        top: 10px;
        background-color: rgba(43, 255, 0, 0.719);
        font-weight: bold;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
      }
      .property{
        color: royalblue;
      }
      .value{
        color: rgb(209, 209, 209);
      }
      textarea{
        visibility: hidden;
        position: absolute;
        opacity: 0;
      }
      .mask{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color:rgba(0, 0, 0, .8);
        visibility: hidden;
        font-size: 30px;
        z-index: 98;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s ease;
      }
    }
  }
</style>