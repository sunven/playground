export default {
  render(h) {
    //标记是一个routerview
    this.$vnode.data.routerView = true
    //记录深度，默认0
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData && vnodeData.routerView) {
        //如果父级也是routerview，深度+1
        depth++
      }
      parent = parent.$parent
    }
    //如果  /bar 下面有/bar/bar-1 和/bar/bar-2
    // 1./bar 渲染时，matched中只有一个bar组件，depth为0直接匹配bar组件进行渲染
    // 2./bar内的<router-view>渲染时，depth为1，route为undefined，但不会死循环
    // /bar/bar-1时，matched中有两个route，一个为bar,一个为bar-1
    // /bar内的<router-view>渲染时,会找到matched中的bar-1,也就传染出来了
    const route = this.$router.matched[depth]
    let component = null
    if (route) {
      component = route ? route.component : null
    }
    return h(component)
  },
}
