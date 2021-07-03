class Router {
  constructor() {
    this.stack = []
  }
  register(path, methods, middleware) {
    this.stack.push({ path, methods, middleware })
  }
  get(path, middleware) {
    this.register(path, 'get', middleware)
  }
  post(path, middleware) {
    this.register(path, 'post', middleware)
  }
  routes() {
    let stack = this.stack
    return async (ctx, next) => {
      let currentPath = ctx.url
      let route
      for (let i = 0; i < stack.length; i++) {
        const item = stack[i]
        if (
          currentPath === item.path &&
          item.methods.indexOf(ctx.method) !== -1
        ) {
          route = item.middleware
          break
        }
      }
      if (typeof route === 'function') {
        route(ctx, next)
      }
      await next()
    }
  }
}
module.exports = Router
