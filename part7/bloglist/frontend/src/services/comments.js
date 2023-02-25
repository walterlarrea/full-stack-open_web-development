import axios from 'axios'
const baseUrl = '/api/comments'

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const methods = { create }
export default methods