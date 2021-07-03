const koa = require('./koa')
const Router = require('./router')
const app = new koa()
const router = new Router()
router.get('/index', async ctx => {
  ctx.body = 'index'
})
router.get('/index1', async ctx => {
  ctx.body = 'index1'
})

app.use(router.routes())
app.use(async (ctx, next) => {
  //res.

  const fn1ret = await fn1()
  ctx.body += ' hi 1 ' + fn1ret
  next()
})
app.use((ctx, next) => {
  //res.
  ctx.body += ' hi 2 '
  next()
})
app.listen(3000, () => {
  console.log('listen 3000')
})

function fn1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('timeout')
    }, 2000)
  })
}
