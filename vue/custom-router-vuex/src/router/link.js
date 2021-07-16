//<router-link to="/foo">foo</router-link>
export default {
  props: {
    to: {
      type: String,
      require,
    },
  },
  render(h) {
    return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    //jsx写法
    //return <a href={'#' + this.to}>{this.$slots.default}</a>
  },
}
