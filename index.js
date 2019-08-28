/* eslint-disable */

const path = require('path')
const serve = require('serve-static')
const bodyParser = require('body-parser')
const api = require('./api')

hexo.extend.filter.register('server_middleware', app => {
  app.use(hexo.config.root + 'admin/', serve(path.resolve(__dirname, './dist')))
  app.use(hexo.config.root + 'admin/api/', bodyParser.json({ limit: '50mb' }))

  api.create(hexo, app)
})
