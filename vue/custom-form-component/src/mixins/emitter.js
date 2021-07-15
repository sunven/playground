//不能使用箭头函数this不对
function dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root
  if (!parent) {
    return
  }
  let name = parent.$options.componentName
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.componentName
    }
  }
  if (parent) {
    parent.$emit.call(parent, eventName, params)
  }
}

function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.componentName
    if (name === componentName) {
      child.$emit.call(child, eventName, params)
    } else {
      broadcast(child, componentName, eventName, params)
    }
  })
}

export default {
  methods: {
    dispatch,
    broadcast,
  },
}
