require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'The person name is required'],
    validate: {
      validator: async (v) => {
        const nameCount = await mongoose.models.Person.countDocuments({ name: v })
        return !nameCount
      },
      message: props => `Person named "${props.value}" already exists`,
    },
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'The phone number is required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}?-\d{0,}$/.test(v)
      },
      message: props => `Invalid phone number "${props.value}", try <123-4567...>!`
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)