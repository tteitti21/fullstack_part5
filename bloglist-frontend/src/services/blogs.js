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

const updateBlog = async updatedBlog => {
  const header = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, header)
  return response.data
}

const deleteBlog = async (removableBlog) => {
  const header = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${removableBlog.id}`, header)
  return response.status
}

export default { getAll, postBlog, setToken, updateBlog, deleteBlog }