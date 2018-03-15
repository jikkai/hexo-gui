import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:4000/admin/api'
})

const api = {
  getPosts () {
    return axios.get('/posts/list')
  },
  updatePost (source, raw) {
    return axios.post('/posts/update', { source, raw })
  },
  addPost (title) {
    return axios.post('/posts/add', { title })
  },
  removePost (source) {
    console.log(source)
    return axios.post('/posts/remove', { source })
  }
}

export default api
