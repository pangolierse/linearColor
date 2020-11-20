export class Color{
  constructor(hex){
    if(hex)
      this.hex = hex
    else
      this.init()
  }
  init(){
    let rgb = Color.getRandomRGB()
    this._r = rgb.r
    this._g = rgb.g
    this.b = rgb.b
  }
  // HEX
  get hex(){
    return this._hex.toUpperCase()
  }
  set hex(value){
    this._hex = this.filter(value,'hex')
    this.syncColors.call(this,'hex')
  }
  // HSL - HSV
  get h(){
    return this._h
  }
  set h(value){
    this._h = this.filter(value,'h')
    this.syncColors.call(this,'h')
  }
  // HSL
  get sl(){
    return this._sl
  }
  set sl(value){
    this._sl = this.filter(value,'s')
    this.syncColors.call(this,'sl')
  }
  get l(){
    return this._l
  }
  set l(value){
    this._l = this.filter(value,'l')
    this.syncColors.call(this,'l')
  }
  // HSV
  get sv(){
    return this._sv
  }
  set sv(value){
    this._sv = this.filter(value,'s')
    this.syncColors.call(this,'sv')
  }
  get v(){
    return this._v
  }
  set v(value){
    this._v = this.filter(value,'l')
    this.syncColors.call(this,'v')
  }
  // RGB
  get r(){
    return this._r
  }
  set r(value){
    this._r = this.filter(value,'r')
    this.syncColors.call(this,'r')
  }
  get g(){
    return this._g
  }
  set g(value){
    this._g = this.filter(value,'g')
    this.syncColors.call(this,'g')
  }
  get b(){
    return this._b
  }
  set b(value){
    this._b = this.filter(value,'b')
    this.syncColors.call(this,'b')
  }
  syncColors(type){
    let rgb = {},hsl = {},hsv = {}
    if(type == 'h'){
      rgb = Color.HSVtoRGB(this.h,this.sv/100,this.v/100)
      for(let key in rgb)
        this['_'+key] = rgb[key]
      this._hex = this.gethex(this.r,this.g,this.b)
    }else if(type == 'sl' || type == 'l'){
      hsv = Color.HSLtoHSV(this.h,this.sl/100,this.l/100)
      rgb = Color.HSLtoRGB(this.h,this.sl/100,this.l/100)
      for(let key in rgb)
        this['_'+key] = rgb[key]
      for(let key in hsv)
        this['_'+key] = hsv[key]  
      this._hex = this.gethex(this.r,this.g,this.b)
      
    }else if(type == 'sv' || type == 'v'){
      rgb = Color.HSVtoRGB(this.h,this.sv/100,this.v/100)
      hsl = Color.HSVtoHSL(this.h,this.sv/100,this.v/100)
      for(let key in rgb)
        this['_'+key] = rgb[key]
      for(let key in hsl)
        this['_'+key] = hsl[key]
      this._hex = this.gethex(this.r,this.g,this.b)
    }else if(type == 'hex'){
      let str = this._hex
      this._r = parseInt(str.slice(0,2),16)
      this._g = parseInt(str.slice(2,4),16)
      this._b = parseInt(str.slice(4,6),16)
      hsl = Color.RGBtoHSL(this.r,this.g,this.b)
      hsv = Color.RGBtoHSV(this.r,this.g,this.b)
      for(let key in hsl)
        this['_'+key] = hsl[key]
      for(let key in hsv)
        this['_'+key] = hsv[key]
    }else{
      hsl = Color.RGBtoHSL(this.r,this.g,this.b)
      hsv = Color.RGBtoHSV(this.r,this.g,this.b)
      for(let key in hsl)
        this['_'+key] = hsl[key]
      for(let key in hsv)
        this['_'+key] = hsv[key]
      this._hex = this.gethex(this.r,this.g,this.b)
    }
    this.afterChange && this.afterChange(type)
  }
  filter(value, type){
    value = String(value)
    if(type == 'hex'){
      value = value.replace(/[^abcdef\d]{1,6}/ig,'')
      // value = (value+'00000').match(/[abcdef\d]{1,6}/i)[0]
    }
    else{
      value = value.match(/\d{1,3}/)
      value = Number(value)
    }
    if(value >= 360 && type =='h')
      value = 360
    else if(value >= 100 && (type =='s'||type =='l'))
      value = 100
    else if(value >= 255 && (type =='r'||type =='g'||type =='b'))
      value = 255
    return value
  }
      /**
   * hsv -> rgb
   * @param h [0,360]
   * @param s [0,1]
   * @param v [0,1]
   * @result {r,g,b}
   */
  static HSVtoRGB(h,s,v){
    function fn(n){
      let k = (n + h/60)%6
      return v -v*s*Math.max(0,Math.min(k,4-k,1))
    }
    return {
      r: Math.round(fn(5)*255),
      g: Math.round(fn(3)*255),
      b: Math.round(fn(1)*255)
    }
  } 
    /**
   * hsl -> rgb
   * @param h [0,360]
   * @param s [0,1]
   * @param l [0,1]
   * @result {r,g,b}
   */
  static HSLtoRGB(h,s,l){
    function fn(n){
      let a = s * Math.min(l,1-l)
      let k = (n + h/30)%12
      return l - a*Math.max(-1,Math.min(k-3,9-k,1))
    }
    return {
      r: Math.round(fn(0)*255),
      g: Math.round(fn(8)*255),
      b: Math.round(fn(4)*255)
    }
  } 
   /**
   * hsv -> hsl
   * @param h [0,360]
   * @param s [0,1]
   * @param v [0,1]
   * @result {h,s,l} h <- [0,360], s <- [0,100], l <- [0,100]
   */
  static HSVtoHSL(h,s,v){
    let l = v * (1 - s/2)
    let sl 
    if(l == 0 || l == 1){
      sl = 0
    }else{
      sl = (v - l) / Math.min(l,1-l)
    }
    return {h, sl:Math.round(sl*100), l: Math.round(l*100)}

  }
  /**
   * hsl -> hsv 
   * @param h [0,360]
   * @param s [0,1]
   * @param l [0,1]
   * @result {h,s,l} h <- [0,360], s <- [0,100], v <- [0,100]
   */
  static HSLtoHSV(h,s,l){
    let v = l + s*Math.min(l,1-l)
    let sv
    if(v == 0){
      sv = 0
    }else{
      sv = 2 * (1 - l/v)
    }
    return {h, sv:Math.round(sv*100), v: Math.round(v*100)}

  }
  /**
   * hsl -> rgb
   * @param r [0,255]
   * @param g [0,255]
   * @param b [0,255]
   * @result {h,sl,l} h <- [0,360], sl <- [0,100], l <- [0,100]
   */
  static RGBtoHSL(r,g,b){
    r = Math.round(r/255 * 100)/100   //0.89
    g = Math.round(g/255 * 100)/100   //0.86
    b = Math.round(b/255 * 100)/100   //1

    let xMax = Math.max(r,g,b)
    let xMin = Math.min(r,g,b)
    let C = xMax - xMin
    let h,s,l
    if(C == 0){
      h = 0
    }else if(xMax == r){
      h = 60 * ((g - b)/C)
    }else if(xMax == g){
      h = 60 * (2 + (b - r)/C)
    }else if(xMax == b){
      h = 60 * (4 + (r - g)/C)
    }
    l = Math.round((xMin + xMax)/2*100)/100  //93
    if(l == 0 || l == 1){
      s = 0
    }else{
      s = Math.round((xMax - l)/Math.min(l,1-l)*100)
    }
    h = Math.round(h)
    if(h < 0)
      h = 360 + h
    return {h,sl:s,l:l*100}
  }
  static RGBtoHSV(r,g,b){
    r = Math.round(r/255 * 100)/100   //0.37
    g = Math.round(g/255 * 100)/100   //0.55
    b = Math.round(b/255 * 100)/100   //0.61

    let xMax = Math.max(r,g,b)
    let xMin = Math.min(r,g,b)
    let C = xMax - xMin
    let h,s,v
    if(C == 0){
      h = 0
    }else if(xMax == r){
      h = 60 * ((g - b)/C)
    }else if(xMax == g){
      h = 60 * (2 + (b - r)/C)
    }else if(xMax == b){
      h = 60 * (4 + (r - g)/C)
    }
    v = xMax * 100
    if(xMax == 0){
      s = 0
    }else{
      s = Math.round((1 - xMin / xMax) * 100)
    }
    h = Math.round(h)
    if(h < 0)
      h = 360 + h
    return {h,sv:s,v}
  }
  static getRandomRGB(){
    let r = Math.round(Math.random()*255)
    let g = Math.round(Math.random()*255)
    let b = Math.round(Math.random()*255)
    return{r,g,b}
  }
  gethex(r,g,b){
    r = ('0' + r.toString(16))
    g = ('0' + g.toString(16))
    b = ('0' + b.toString(16))
    return r.slice(r.length - 2) + g.slice(g.length - 2) + b.slice(b.length - 2)
  }
  setRGB(rgb){
    this._r = rgb.r
    this._g = rgb.g
    this.b = rgb.b
  }
  setHSL(hsl){
    this._h = hsl.h
    this._sl = hsl.sl
    this.l = hsl.l
  }
  setHSV(hsv){
    this._h = hsv.h
    this._sv = hsv.sv
    this.v = hsv.v
  }
}
export function createBoxShadow(h,s,v,distance){
  distance = distance.toFixed(0)
  let dis = 12,up,down
  down = (v - dis)
  up = (v + dis)
  if(up > 100)
    up = 100
  if(down < 0)
    down = 0
  let x = distance+'px'
  let y = distance+'px'
  let blur = distance*2+'px'
  let rgb1 = Color.HSVtoRGB(h,s/100,down/100)
  let rgb2 = Color.HSVtoRGB(h,s/100,up/100)
  let str = `${x} ${y} ${blur} rgb(${rgb1.r},${rgb1.g},${rgb1.b}),
  -${x} -${y} ${blur} rgb(${rgb2.r},${rgb2.g},${rgb2.b}) `
  return str
}