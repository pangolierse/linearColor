import Vue from 'vue'
import Vuex from 'vuex'
import {Color} from '@common/Color'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    puityColor: new Color()
  },
  getters:{
    puityColor(state){
      return state.puityColor
    }
  },
  mutations: {
    changeH(state,h){
      state.puityColor.h = h
    },
    changeSL(state,hsv){
      state.puityColor.setHSV(hsv)
    },
    changeColor(state,{value,type}){
      state.puityColor[type] = value
    }
  }
})
