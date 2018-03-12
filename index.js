const path = require('path')
const serve = require('serve-static')

hexo.extend.filter.register('server_middleware', app => {
  console.log(123)
  app.use(hexo.config.root + 'admin/', serve(path.resolve(__dirname, './release')))
})
