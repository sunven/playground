const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const resolve = dir => path.resolve(__dirname, dir)

// 静态文件
app.use(express.static(resolve('../dist/client'), { index: false }))
// BundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  // 宿主文件
  template: fs.readFileSync(resolve('../public/index.html'), 'utf-8'),
  // 客户端清单
  clientManifest: require(resolve(
    '../dist/client/vue-ssr-client-manifest.json'
  )),
})

app.get('*', async (req, res) => {
  const context = { url: req.url }
  //   创建vue实例，跳转至首屏，渲染出来，类似快照
  const html = await renderer.renderToString(context)
  res.send(html)
})

app.listen(3000, () => {
  console.log('listen at 3000')
})
