const fs = require('fs')

const api = {}

api.create = (hexo, app) => {
  // ==========================================
  // 创建 api 路由
  // ==========================================
  function createRouter (name, cb) {
    const root = `${hexo.config.root}admin/api`

    app.use(root + name, (req, res) => {
      res.done = (val) => {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Origin', '*')
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

  createRouter('/posts/update', (req, res) => {
    if (req.method === 'POST') {
      const { source, raw } = req.body
      console.log(fs.writeFileSync(source, raw))
    }
    res.done({})
  })
}

module.exports = api
