class GUI {
  constructor (hexo, app) {
    this.hexo = hexo
    this.app = app

    this.createRouter(`/posts/list`, (req, res) => {
      const post = hexo.model('Post')
      res.done(
        JSON.stringify(post.toArray(), (key, value) => {
          if (key === 'tags' || key === 'categories') {
            return value.toArray ? value.toArray().map(obj => obj.name) : value
          }
          return value
        })
      )
    })
  }

  createRouter (name, cb) {
    const root = `${this.hexo.config.root}admin/api`

    this.app.use(root + name, (req, res) => {
      res.done = value => {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-type', 'application/json')

        res.end(value)
      }
      cb(req, res)
    })
  }
}

module.exports = GUI
