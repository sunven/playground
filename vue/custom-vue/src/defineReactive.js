//单个属性
function defineReactive(obj, key, value) {
  //value是对象
  observe(value)

  Object.defineProperty(obj, key, {
    //1.新属性不能被拦截($set)
    //2.数组不支持
    get() {
      //利用闭包，驻留value
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        //newValue是对象
        observe(newValue)
        value = newValue
      }
    },
  })
}

//新增属性
function set(obj, key, value) {
  defineReactive(obj, key, value)
}

//整个对象
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
