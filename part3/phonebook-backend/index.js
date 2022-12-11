require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const Person = require('./models/person')

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
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

// This route should be a PATCH now??
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(people => {
      res.send(`
        <p>Phonebook has info for ${people.length} people</p>  
        <p>${new Date()}</p>
        `)
    })
    .catch(error => netx(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})