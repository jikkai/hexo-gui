const path = require('path')
const serve = require('serve-static')
const bodyParser = require('body-parser')
const GUI = require('./gui')

hexo.extend.filter.register('server_middleware', app => {
  app.use(hexo.config.root + 'admin/', serve(path.resolve(__dirname, './release')))
  app.use(hexo.config.root + 'admin/api/', bodyParser.json({ limit: '50mb' }))

  new GUI(hexo, app)
})
