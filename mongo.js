const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = String(process.argv[3])
const number = String(process.argv[4])

const url =
  `mongodb+srv://fullstack:${password}@cluster0.egdwfa8.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', peopleSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(() => {
        console.log('added ' + name + ' number ' + number + ' to phonebook')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
            mongoose.connection.close()
        })
    })
}
