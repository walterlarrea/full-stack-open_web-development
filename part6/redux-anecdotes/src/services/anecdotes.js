import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addVote = async (id) => {
  const anecdoteToVote = await getById(id)
  const modifiedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

  const response = await axios.put(`${baseUrl}/${id}`, modifiedAnecdote)
  return response.data
}

const methods = {
  getAll,
  createNew,
  addVote,
}

export default methods