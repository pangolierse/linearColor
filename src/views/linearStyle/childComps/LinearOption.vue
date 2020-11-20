<template>
  <div class="linear-option">
    
    <div class="circle" ref="circle">
      <div class="circle-span" ref="circleSpan"><input class="circle-input" @input="verfication($event)" v-model="deg" maxlength="3"/></div>
    </div>
    <div class="lock">
      <span>Sync W&H</span>
      <div class="is-lock" @click="lock">
        <div class="is-lock-o" ref="isLockO"></div>
      </div>
    </div>
    <button class="create-linear" @click="btnClick"> + </button>
  </div>
</template>
<script>
  import {getPageLocate,throttleDecorator} from '@common/utils'
    import {
    CHANGE_LINEAR_DEG,
  } from '@common/BusEventName'
  export default {
    name: 'LinearOption',
    data(){
      return{
        deg:0,
        isLock:false,
      }
    },
    mounted(){
      let circle = this.$refs.circle
      let circleSpan = this.$refs.circleSpan
      let location = getPageLocate(circle)
      let rotate = this.rotate
      circle.onclick = function(event){
        if(event.target == this)
          rotate(circle,event,location,circleSpan)
      }
      circle.onmousedown = function(e){
        if(e.target == this)
        document.onmousemove = (event) => {
          rotate(circle,event,location,circleSpan)
        }
      }
      document.onmouseup = function(){
        document.onmousemove = null
      }
    },
    methods:{
      btnClick(){
        this.$emit('create')
      },
      verfication(event){
        let circle = this.$refs.circle
        let circleSpan = this.$refs.circleSpan
        let value = event.target.value
        value = Number(value.match(/\d{1,3}/))
        this.deg = value
        circle.style.transform = `rotate(${value}deg)`
        circleSpan.style.transform = `rotate(-${value}deg)`
        // ShowBox on
        this.$bus.$emit(CHANGE_LINEAR_DEG,this.deg)
      },
      rotate(el,event,location,circleSpan){

        let x = event.clientX - location.left - el.offsetWidth / 2
        let y = event.clientY - location.top - el.offsetHeight / 2
        let c = Math.sqrt(x*x+y*y)
        let n = 0
        let deg = 0
        if(x <= 0 && y > 0){
          n = 2
          deg = Math.acos(Math.abs(y)/c) * 180/Math.PI + n*90
        }
        else if(x > 0 && y <= 0){
          n = 0
          deg = Math.asin(Math.abs(x)/c) * 180/Math.PI + n*90
        }else if(x > 0 && y > 0){
          n = 1
          deg = Math.acos(Math.abs(x)/c) * 180/Math.PI + n*90
        }else if(x < 0 && y <= 0){
          n = 3
          deg = Math.asin(Math.abs(y)/c) * 180/Math.PI + n*90
        }
        deg = deg.toFixed(0)
        this.deg = deg
        el.style.transform = `rotate(${deg}deg)`
        circleSpan.style.transform = `rotate(-${deg}deg)`
        event.preventDefault()
        // ShowBox on
        this.$bus.$emit(CHANGE_LINEAR_DEG,deg)
      },
      lock(){
        let isLockO = this.$refs.isLockO
        this.isLock = !this.isLock
        if(this.isLock){
          isLockO.style.width = '100%'
        }else{
          isLockO.style.width = '20px'
        }
        this.$emit('isLock',this.isLock)
      },
    }
  }
</script>
<style lang='less' scope>
.linear-option{
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
  .circle{
    width: 100px;
    height: 100px;
    background-color: transparent;
    border: 4px solid white;
    border-radius: 50%;
    color: black;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      border-top: 10px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-bottom: 10px solid @progressColor;
    }
    .circle-span{
      width: 30px;
      height: 20px;
    }
    .circle-input{
      width: 30px;
      height: 20px;
      background-color: transparent;
      text-align: center;
      border: none;
      outline: none;
      font-weight: bold;
    }
  }
  .lock{
    display: flex;
    flex-direction: column;
    align-items: center;
    &>span{
      font-size: 14px;
      margin-bottom: 5px;
    }
    .is-lock{
      width: 50px;
      height: 20px;
      border-radius: 30px;
      overflow: hidden;
      border: 4px solid white;
      box-sizing: content-box;
      .is-lock-o{
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 30px;
        transition: 0.3s ease;
        &::after{
          content: '';
          height: 20px;      
          width: 20px;
          position: absolute;
          border-radius: 30px;
          background-color:@progressColor;
          right: 0;
        }
      }
  }
  }
  .create-linear{
    width: 200px;
    height: 50px;
    border-radius: 30px;
    outline: none;
    border: none;
    font-size: 36px;
    border: 4px solid white;
    background-color: transparent;
    // &:hover{
    // }
  }
}
</style>