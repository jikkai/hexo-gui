const api = {}

api.create = (hexo, app) => {
  // ==========================================
  // 创建 api 路由
  // ==========================================
  function createRouter (path, cb) {
    const root = `${hexo.config.root}admin/api`

    app.use(root + path, (req, res) => {
      res.done = (val) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(val, (key, value) => {
          if (key === 'tags' || key === 'categories') {
            return value.toArray ? value.toArray().map(obj => obj.name) : value
          }
          return value
        }))
      }
      res.send = (statusCode, data) => {
        res.statusCode = statusCode
        res.end(data)
      }
      cb(req, res)
    })
  }

  createRouter('/posts/list', (req, res) => {
    const post = hexo.model('Post')
    res.done(post.toArray())
  })
}

module.exports = api
