const { exec } = require('child_process')
const fs = require('fs-extra')

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
    res.done({
      posts: hexo.model('Post').find({ published: true }).toArray(),
      drafts: hexo.model('Post').find({ published: false }).toArray()
    })
  })

  createRouter('/posts/update', (req, res) => {
    if (req.method === 'POST') {
      const { source, raw } = req.body
      fs.writeFileSync(source, raw)
    }
    res.done({})
  })

  createRouter('/posts/add', async (req, res) => {
    if (req.method === 'POST') {
      const { title } = req.body
      await hexo.post.create(Object.assign({ title }, hexo.config.metadata))
    }
    res.done({})
  })

  createRouter('/posts/open/asset', async (req, res) => {
    if (req.method === 'POST') {
      const { source } = req.body
      exec(`open ${source}`)
    }
    res.done({})
  })

  createRouter('/posts/remove', (req, res) => {
    if (req.method === 'POST') {
      const { source } = req.body
      fs.removeSync(source)
    }
    res.done({})
  })
}

module.exports = api
