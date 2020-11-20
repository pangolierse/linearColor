//throttle decorator 
export function throttleDecorator(func,delay){
  let prev = Date.now()
  let timer = null
  return function() {
    let now = Date.now()
    let remain = delay - (now - prev)
    let obj = this
    let args = arguments
    clearTimeout(timer)
    if(remain <= 0){
      func.apply(obj, args);
      prev = Date.now()
    }else if(remain > 0 && timer === null){
      timer = setTimeout(()=>{
        func.apply(obj, args);
      },remain)
    }
  }
}
// debounceDecorator
export function debounceDecorator(func, delay){
  let timer = null
  return function(){
    let obj = this
    let args = arguments
    if(timer !== null)
      clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(obj,args)
    },delay)
  }
}
function movable(element,func){
  element.onclick = function(e){
    func && func.apply(element,[e,getPageLocate(element)])
  }
  element.onmousedown = function(){
      document.onmousemove = function(e) {
        func && func.apply(element,[e,getPageLocate(element)])
        e.preventDefault()
      }
    }
    document.onmouseup = function(){
      document.onmousemove = null
    }
}
function getPageLocate(element){
  let top = 0
  let left = 0
  while(element.parentElement){
    top += element.offsetTop
    left += element.offsetLeft
    element = element.parentElement
  }
  return {top,left}
}
export {movable , getPageLocate}