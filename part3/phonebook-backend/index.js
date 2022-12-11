require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const Person = require('./models.Person')

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

app.use(cors())
app.use(express.json())

app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || body.name === '') {
    return res.status(400).json({ error: 'name missing' })
  }
  if (!body.number || body.number === '') {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})