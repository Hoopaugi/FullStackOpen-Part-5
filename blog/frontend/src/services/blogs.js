import axios from 'axios'
import config from '../config'

let token = null

const baseUrl = `${config.BACKEND_URI}/api/blogs`

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)

  return response.data
}

const update = async (id, newObject) => {
  const response = axios.put(`${ baseUrl }/${id}`, newObject)

  return response.data
}

export default { getAll, create, update, setToken, remove }