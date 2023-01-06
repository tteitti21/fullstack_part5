import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = unparsedToken => {
  token = `bearer ${unparsedToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async newBlog => {
  const header = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, header)
  return response.data
}

export default { getAll, postBlog, setToken }