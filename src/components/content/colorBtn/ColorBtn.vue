<template>
  <div class="color-btn-contain">
    <button class="btn"  
    ref="colorBtn"
    @click.self="showColorPad($event)"
    >
    <color-small  
    v-show="colorPadShow" 
    ref="colorPad"
    @colorChange="changeBtnBC($event)"
    :hex="toPadHex"
    v-bind="$attrs"></color-small>
    </button>
    <span>OR</span>
    <input type="text" 
    v-model="hex" 
    @input="verfication($event)" 
    @blur="hexConfirm($event)"
    maxlength="6" >
  </div>
</template>
<script>
  import ColorSmall from './ColorSmall'
  import {getPageLocate} from '@common/utils'
  export default {
    name: 'ColorBtn',
    components:{
      ColorSmall,
    },
    data(){
      return{
        myColor:null,
        hex:'',
        colorPadShow:true,
        toPadHex:'',
      }
    },
    methods:{
      showColorPad(event){
        //显示色盘
        let colorPad = this.$refs.colorPad.$el
        let colorBtn = event.target
        let left = colorBtn.offsetWidth
        let top = colorBtn.offsetHeight
        colorPad.style.visibility = 'visible'
        colorPad.focus()
        colorPad.style.top = top + 'px'
        colorPad.style.left = left + 'px'
        let locate = getPageLocate(colorPad)
        document.documentElement.onmousedown = function(event){
          let left = locate.left
          let top = locate.top
          if(
          left > event.clientX || 
          (left + colorPad.offsetWidth) < event.clientX || 
          top > event.clientY || 
          (top + colorPad.offsetHeight) < event.clientY
          ){
            colorPad.style.visibility = 'hidden'
            document.documentElement.onmousedown = null
          }
        }
      },
      changeBtnBC(color){
        this.myColor = color
        this.$refs.colorBtn.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
        this.hex = color.hex
        // emit Color
        this.$emit('colorChange',color)
      },
      verfication(e){
        let value = String(e.target.value)
        value = value.replace(/[^abcdef\d]{1,6}/ig,'')
        e.target.value = value
      },
      hexConfirm(e){
        let value = String(e.target.value)
        value = (value+'00000').match(/[abcdef\d]{1,6}/i)[0]
        e.target.value = value
        this.toPadHex = value
      },
    }
  }
</script>
<style lang='less' scope>
  .color-btn-contain{
    margin: 0 20px;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    &>.btn{
      width: 50px;
      height: 20px;
      background-color: #5665dc;
      border: 4px solid white;
      cursor: pointer;
      &:focus{
        outline: none;
      }
    }
    &>input{
      height: 20px;
      width: 55px;
      font-size: 12px;
      border: none;
      outline: none;
      text-align: center;
      border: 4px solid white;
      box-sizing: border-box;
    }
  }
</style>