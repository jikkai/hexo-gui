const { exec } = require('child_process')
const fs = require('fs-extra')
const moment = require('moment')
const jsyaml = require('js-yaml')

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

  createRouter('/posts/list', (_, res) => {
    res.done({
      posts: hexo.model('Post').find({ published: true }).toArray().sort((a, b) => b.date - a.date),
      drafts: hexo.model('Post').find({ published: false }).toArray().sort((a, b) => b.date - a.date)
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
    let post
    if (req.method === 'POST') {
      const { title } = req.body
      post = await hexo.post.create(Object.assign({
        title,
        date: moment().format('YYYY-MM-DD HH:mm:ss')
      }, hexo.config.metadata))
    }
    res.done(post)
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

  createRouter('/configs', (req, res) => {
    const themeConfig = fs.readFileSync(`${hexo.theme.base}_config.yml`)

    res.done({
      theme: jsyaml.safeLoad(themeConfig),
      global: hexo.config
    })
  })
}

module.exports = api
