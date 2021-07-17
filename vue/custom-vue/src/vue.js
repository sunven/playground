//数组响应式
const orginalProto = Array.prototype
const arrayProto = Object.create(orginalProto)
;['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function () {
    //原来的操作
    orginalProto[method].apply(this, arguments)
    //通知更新
  }
})

//单个属性
function defineReactive(obj, key, value) {
  //value是对象
  observe(value)

  //依赖,key与该dep一一对应
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    //1.新属性不能被拦截($set)
    //2.数组不支持
    get() {
      //利用闭包，驻留value
      //
      Dep.target && dep.addDep(Dep.target)
      console.log('get', key, value)
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        //newValue是对象
        observe(newValue)
        value = newValue
        dep.notify()
        console.log('set', key, value)
      }
    },
  })
}

//新增属性
function set(obj, key, value) {
  defineReactive(obj, key, value)
}

//观察整个对象
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  return new Observer(obj)
}

//代理data
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(value) {
        vm.$data[key] = value
      },
    })
  })
}

class Vue {
  constructor(options) {
    this.options = options
    this.$data = options.data

    //观察
    observe(this.$data)
    //代理data
    proxy(this)
    //编译器
    new Compiler('#app', this)
  }
}

//观察者对象
class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(value) {
    const keys = Object.keys(value)
    if (Array.isArray(value)) {
      //如果是数组
      value.__proto__ = arrayProto
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        observe(key)
      }
    } else {
      keys.forEach(key => {
        defineReactive(value, key, value[key])
      })
    }
  }
}

//编译
class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    this.compile(this.$el)
  }

  //编译
  compile(el) {
    //childNodes 属性返回所有的节点，包括文本节点、注释节点
    //children 属性只返回元素节点
    el.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        //元素
        this.compileElement(node)
      } else if (this.isInter(node)) {
        this.compileText(node)
      }
      //子节点
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  //解析文本节点 {{count}}
  compileText(node) {
    //node.textContent = this.$vm[RegExp.$1]
    // node.textContent = node.textContent.replace(
    //   `{{${RegExp.$1}}}`,
    //   this.$vm[RegExp.$1]
    // )
    this.update(node, RegExp.$1, 'text')
  }

  //解析元素节点
  compileElement(node) {
    //v- @
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      //{name:'v-text',value:'count'}
      const { name, value } = attr
      if (name === 'v-model') {
        this.value && this.value(node, value)
        node.addEventListener('input', e => {
          this.$vm[value] = e.target.value
        })
      } else if (name.indexOf('v-') === 0) {
        //取得text
        const dir = name.substring(2)
        this[dir] && this[dir](node, value)
      } else if (this.isEvent(name)) {
        const dir = name.substring(1)
        this.eventHandler(node, dir, value)
      }
    })
  }

  bindInput(exp, e) {
    this.$vm[exp] = e.target.value
  }

  eventHandler(node, dir, exp) {
    const fn = this.$vm.options.methods[exp]
    node.addEventListener(dir, fn.bind(this.$vm))
  }

  value(node, value) {
    this.update(node, value, 'value')
  }

  text(node, value) {
    this.update(node, value, 'text')
  }

  html(node, value) {
    this.update(node, value, 'html')
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    //构建一个watcher
    //该watcher与当前这个属性、更新函数绑定
    new Watcher(this.$vm, exp, value => {
      fn && fn(node, value)
    })
  }

  textUpdater(node, value) {
    node.textContent = value
  }

  htmlUpdater(node, html) {
    node.innerHTML = html
  }

  valueUpdater(node, value) {
    node.value = value
  }

  //文本节点，想{{count}}这样
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  isEvent(name) {
    return name[0] === '@'
  }
}

//监控一个依赖，变化时更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    //触发依赖收集
    Dep.target = this
    vm[key]
    Dep.target = null
  }

  //更新
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

//管理依赖，保存所有Watcher,变化时，触发notify
//一个属性，对应一个Dep
//一个Dep对应多个Watcher
//每一个Watch中有该属性的更新函数
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
