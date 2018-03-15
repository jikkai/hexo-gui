import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:4000/admin/api'
})

const api = {
  getPosts () {
    return axios.get('/posts/list')
  }
}

export default api
