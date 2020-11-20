<template>
  <div class="lock">
    <span><slot></slot></span>
    <div class="is-lock" @click="lock">
      <div class="is-lock-o" ref="isLockO"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BtnLock',
    methods:{
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
</style>