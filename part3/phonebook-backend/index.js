const express = require("express")
const morgan = require("morgan")
const app = express()

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.use(express.json())

/// MORGAN
morgan.token('morganReqBody', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :morganReqBody', {
  skip: (req, res) => { return req.method !== 'POST' }
}))
/// End morgan

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || body.name === '') {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!body.number || body.number === '') {
    return res.status(400).json({ error: 'number missing' })
  }
  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: Math.floor(Math.random() * (9999 - 1) + 1),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  return res.send(`
  <p>Phonebook has info for ${persons.length} people</p>  
  <p>${new Date()}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })