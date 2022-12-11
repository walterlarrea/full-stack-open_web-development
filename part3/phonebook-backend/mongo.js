const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.12zclxb.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if (personName && personNumber) {
      const person = new Person({
        name: personName,
        number: personNumber,
      })
      console.log(`added ${personName} number ${personNumber} to phonebook`)
      return person.save()
    } else {
      return Person
        .find({})
        .then(result => {
          console.log('phonebook:')
          result.forEach(person => {
            console.log(person.name, person.number)
          })
        })
    }
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))