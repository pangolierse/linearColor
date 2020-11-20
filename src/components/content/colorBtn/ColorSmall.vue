<template>
  <div class="color-choose" id="smallColor" tabindex="2">
    <touch-pad :afterMoved="changeSL" ref="baseColor"
      :locaLeft="touchPadLeft"
      :locaTop="touchPadTop"
      @moving="movingEvent"
      @moved="movedEvent"
    ></touch-pad>
    <div class="center">
      <div class="show-color" ref="showColor"></div>
      <my-progress 
      :afterMoved="changeH"
      @moving="movingEvent"
      @moved="movedEvent"
      :left="progressLeft"
      ></my-progress>
    </div>
    <div class="input-list">
      <div ref='ilTop'>
        <input type="text"
          v-for="(value,index) in rgb"
          :key="index"
          v-model="puityColor[value]"
          @input="verfication($event,'rgb')"
          maxlength="3"
        >
      </div>
      <div>
        <input type="text" name="hex" @blur="hexConfirm($event)" @input="verfication($event,'hex')" v-model="puityColor.hex" maxlength="6">
      </div>
      <div>
        <input type="text"
          v-for="(value,index) in hsl"
          :key="index"
          v-model="puityColor[value]"
          @input="verfication($event,value)"
          maxlength="3"
        >
      </div>
    </div>
    <div class="choose-list" @click="chooseType">
      <div ref='clTop'>
        <span>R</span><span>G</span><span>B</span>
      </div>
      <div>
        <span>HEX</span>
      </div>
      <div>
        <span>H</span><span>S</span><span>L</span>
      </div>
    </div>
  </div>
</template>

<script>
import MyProgress from '@components/common/progress/MyProgress'
import TouchPad from '@components/common/touchPad/TouchPad'
import {Color} from '@common/Color'
  export default {
    name: 'ColorSmall',
    components:{
      MyProgress,
      TouchPad,
    },
    props:{
      fatherColor:{
        type: Object,
        defalut(){
          return new Color()
        }
      },
      hex:{
        type:String,
      },
      init:{
        type:String,
      },
    },
    data(){
      return{
        puityColor:{},
        rgb:{r:'r',g:'g',b:'b'},
        hsl:{h:'h',sl:'sl',l:'l'},
        currentIndex:0,
        typeNum:3,
        touchPadLeft:0,
        touchPadTop:0,
        moving:false,
        progressLeft:0
      }
    },
    mounted(){
      Color.prototype.afterChange = () => {
        if(!this.moving){
          this.touchPadLeft = this.puityColor.sv / 100
          this.touchPadTop = 1-this.puityColor.v / 100
          this.progressLeft = this.puityColor.h / 360
        }
      }
      this.puityColor = new Color(this.init || undefined)
    },
    methods:{
      verfication(e,type){
        let value = String(e.target.value)
        if(type == 'hex'){
          value = value.replace(/[^abcdef\d]{1,6}/ig,'')
          e.target.value = value
          return
        }
        else{
          value = value.match(/\d{1,3}/)
          value = Number(value)
        }
        if(value >= 360 && type =='h')
          value = 360
        else if(value >= 100 && (type =='sl'||type =='l'))
          value = 100
        else if(value >= 255 && (type =='rgb'))
          value = 255
        e.target.value = value
      },
      hexConfirm(e){
        let value = String(e.target.value)
        value = (value+'00000').match(/[abcdef\d]{1,6}/i)[0]
        e.target.value = value
      },
      chooseType(){
        let clTop = this.$refs.clTop
        let ilTop = this.$refs.ilTop
        this.currentIndex = ++this.currentIndex % this.typeNum
        ilTop.style.marginTop = -this.currentIndex * ilTop.offsetHeight + 'px'
        clTop.style.marginTop = -this.currentIndex * clTop.offsetHeight + 'px'
      },
      changeH(percent){
        this.puityColor.h = (360*percent).toFixed(0)
      },
      changeSL(percent){
        let h = this.puityColor.h
        let sv = percent.leftPercent
        let v = 100-percent.topPercent
        this.puityColor.setHSV({h,sv,v})
      },
      changeShowColor(){
        let showColor = this.$refs.showColor
        let baseColor = this.$refs.baseColor.$el
        let color = this.puityColor
        let rgb = Color.HSLtoRGB(color.h,1,0.5)
        baseColor.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`
        showColor.style.backgroundColor = '#' + color.hex
      },
      movingEvent(){
        this.moving = true
      },
      movedEvent(){
        this.moving = false
      },
      
    },
    watch:{
      puityColor:{
        handler(newValue){
          this.changeShowColor()
          // 抛出颜色变换事件
          this.$emit('colorChange',newValue)
        },
        deep:true
      },
      hex(value){
        this.puityColor.hex = value
      }
    }
  }
</script>

<style lang="less">
.color-choose{
  width: 240px;
  padding: 2px;
  background-color: #fff;
  position: absolute;
  outline: none;
  top: 0;
  z-index: 999;
  visibility: hidden;
  .touch-pad{
    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-image: linear-gradient(to right, white,rgba(0,0,0,0));
    }
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-image: linear-gradient(to top, black,rgba(255,255,255,0));
    }
  }
  .choose-sl{
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
    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(to right, white,rgba(0,0,0,0));
    }
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-image: linear-gradient(to top, black,rgba(255,255,255,0));
    }
  }
  .center{
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .show-color{
      width: 30px;
      height: 30px;
      background-color: #5F8B9B;
      border-radius: 50%;
    }
    .progress{
      width: 150px;
      height: 10px;
      background-image: linear-gradient(to right , hsl(0,100%,50%), hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%),);
      cursor: pointer;
      .progress-o{
        height: 10px;
        background-color: transparent;
      }
      .progress-o::after{
        background-color: transparent;
        box-sizing: border-box;
        width: 0;
        border: 2px solid rgba(0, 0, 0);
        box-shadow: none;
        border-radius: 0;
      }
    }
    .choose-h{
      width: 150px;
      height: 10px;
      position: relative;
      background-image: linear-gradient(to right , hsl(0,100%,50%), hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%),);
      cursor: pointer;
      .circle{
        width: 18px;
        height: 18px;
        border: 4px solid rgba(255,255,255,0.8);
        border-radius: 50%;
        position: absolute;
        top: -4px;
        left: -9px;
        background-color: hsl(0,100%,50%);
        /* box-sizing: border-box; */
      }
    }
  }
  .input-list{
    width: 100%;
    height: 30px;
    overflow: hidden;
    div{
      height: 30px;
      display: flex;
    }
    input{
      width: 30px;
      margin: 0 10px;
      flex-grow: 1;
      text-align: center;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 5px;
    }
    input:focus{
      outline: none;
    }
  }
  .choose-list{
    height: 40px;
    line-height: 40px;
    /* margin-top: -40px; */
    overflow: hidden;
    &:hover{
      background-color: rgba(172, 164, 164, 0.1);
      box-sizing: border-box;
      background-clip: border-box;
    }
    div{
      width: 100%;
      display: flex;
      text-align: center;
    }
    span{
      width: 30px;
      margin: 0 10px;
      flex-grow: 1;
      color: rgba(0,0,0,0.5);
    }
  }
}
</style>