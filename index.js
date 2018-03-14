const path = require('path')
const serve = require('serve-static')
const api = require('./api')

hexo.extend.filter.register('server_middleware', app => {
  app.use(hexo.config.root + 'admin/', serve(path.resolve(__dirname, './release')))

  api.create(hexo, app)
})
