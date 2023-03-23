require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
var morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())

app.use(express.json())

morgan.token('post-data', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    res.send(
        'Phonebook has info for ' + persons.length + ' people <br> <br> ' + new Date().toString()
        )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    Person.findById(id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 1000000)
    const person = req.body

    if (!person.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } if (!person.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        }

)}

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})