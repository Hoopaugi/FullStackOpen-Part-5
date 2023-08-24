import config from "../config";

import axios from 'axios'
const baseUrl = `${config.BACKEND_URI}/api/login`

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }