const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")

app.use(bodyParser.json())

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(function(tokens, req, res) {
    if (req.method === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        tokens["body"](req, res)
      ].join(" ")
    } else {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms"
      ].join(" ")
    }
  })
)

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => {
    return person.id === id
  })
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get("/info", (req, res) => {
  const length = persons.length
  res.send(`<p>Phonebook has info for ${length} people</p>
  <p>${Date()}</p>`)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 10000)

app.post("/api/persons", (req, res) => {
  console.log(req.body)
  const body = req.body

  app.use(morgan("body"))

  if (!body.name) {
    return res.status(400).json({
      error: "name missing"
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: "number missing"
    })
  } else if (
    persons.find(
      person => person.name.toUpperCase() === body.name.toUpperCase()
    )
  ) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
