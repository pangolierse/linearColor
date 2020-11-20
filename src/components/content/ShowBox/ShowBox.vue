<template>
  <div class="show-box" ref="showBox">
    
  </div>
</template>
<script>
  import {Color,createBoxShadow} from '@common/Color'
  import {
    SHOW_BOX_PUITY,
    
    INIT_BOX_LINEAR,
    SHOW_BOX_LINEAR_COLOR,
    DELETE_COLOR,
    CHANGE_LINEAR_DEG,

    IMAGE_WIDTH,
    IMAGE_HEIGHT,

    BOX_RADIUS,
    BOX_SIZE,
    BOX_DISTANCE,

    CHANGE_PROPERTY,
  } from '@common/BusEventName'
  export default {
    name: 'ShowBox',
    data(){
      return{
        maxWidth: 410,
        minWidth: 40,
        minDis: 5,
        maxDis: 50,
        prevColor: null,
        colors:[],
        linearDeg:0,
        nowDis:0,
        boxWidth: 0,
        imageWidth: 0,
        imageHeight: 0,
      }
    },
    mounted(){
      let showBox = this.$refs.showBox
      // BoxStyle emit
      this.$bus.$on(BOX_SIZE, this._beforeDo((percent) => {
        let width = (this.maxWidth-this.minWidth) * percent
        showBox.style.width = this.minWidth + width + 'px'
        showBox.style.height = this.minWidth + width + 'px'
        this.boxWidth = showBox.offsetWidth
        this.changeImageSize(showBox)
      }))
      // BoxStyle emit
      this.$bus.$on(BOX_RADIUS, this._beforeDo((percent) => {
        showBox.style.borderRadius = percent*100/2 + '%'
      }))
      // BoxStyle emit
      this.$bus.$on(BOX_DISTANCE,this._beforeDo((percent) => {
        let dis = percent * (this.maxDis - this.minDis) + this.minDis
        this.nowDis = dis
        showBox.style.boxShadow = createBoxShadow(this.prevColor.h,this.prevColor.sv,this.prevColor.v,dis)
      }))
      // BoxStyle emit
      this.$bus.$on(SHOW_BOX_PUITY,this._beforeDo((color) => {
        showBox.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`
        showBox.style.boxShadow = createBoxShadow(color.h,color.sv,color.v,this.nowDis)
        this.prevColor = color
      }))
      // LinearStyle emit
      this.$bus.$on(INIT_BOX_LINEAR,this._beforeDo((color,index) =>{
        this.colors.push(color)
      }))
      // LinearStyle emit
      this.$bus.$on(SHOW_BOX_LINEAR_COLOR,this._beforeDo(() =>{
        this.changeLinearShow(showBox)
      }))
      // LinearStyle emit
      this.$bus.$on(DELETE_COLOR,this._beforeDo((index) =>{
        this.colors.splice(index,1)
        this.changeLinearShow(showBox)
      }))
      // LinearOption emit
      this.$bus.$on(CHANGE_LINEAR_DEG,this._beforeDo((deg) =>{
        this.linearDeg = deg
        this.changeLinearShow(showBox)
      }))
      // LinearOption emit
      this.$bus.$on(IMAGE_WIDTH,this._beforeDo((percent) =>{
        this.imageWidthP = percent
        this.changeImageSize(showBox)
      }))
      // LinearOption emit
      this.$bus.$on(IMAGE_HEIGHT,this._beforeDo((percent) =>{
        this.imageHeightP = percent
        this.changeImageSize(showBox)
      }))
      
    },
    methods:{
      changeImageSize(el){
        let width = (this.imageWidthP * this.boxWidth).toFixed(0)
        let height = (this.imageHeightP * this.boxWidth).toFixed(0)
        el.style.backgroundSize = `${width}px ${height}px`
      },
      changeLinearShow(el){
        if(this.colors.length > 1){
          let rgb = this._getLinear()
          el.style.backgroundImage = `linear-gradient(${this.linearDeg}deg,${rgb})`
        }
      },
      _getLinear(){
        let str = []
        this.colors.forEach(value => {
          str.push(`rgb(${value.r},${value.g},${value.b}) ${value.percent}%`)
        })
        return str.join(',')
      },
      _beforeDo(func){
        let showBox = this.$refs.showBox
        return function(){
          // on BoxStyle
          let obj = this
          let args = arguments
          func.apply(obj,args)
          this.$bus.$emit(CHANGE_PROPERTY, showBox)
        }
      }
    }
  }
</script>

<style scoped>
.show-box{
  width: 240px;
  height: 240px;
  border-radius: 25%;
}
</style>