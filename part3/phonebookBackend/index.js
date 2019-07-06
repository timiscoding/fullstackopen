const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    "name": "arto hellas",
    "number": "12345",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
];

app.route('/api/persons')
  .get((req, res) => {
    res.json(persons);
  })
  .post((req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
      return res.status(400).json({
        error: "name and number must not be blank"
      });
    }
    const personExists = persons.find(p => p.name === name);
    if (personExists) {
      return res.status(400).json({
        error: "name must be unique"
      });
    }
    const person = {
      name,
      number,
      id: persons.length + Math.floor(Math.random() * 1000)
    };
    persons = persons.concat(person);
    res.status(201).json(person);
  });

app.get('/info', (req, res) => {
  res.send(`
    <p>Info has info for ${persons.length} people</p>
    <br>
    <p>${new Date()}</p>`);
});

app.route('/api/persons/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    if (!person) {
      return res.status(404).json({ error: `person with id ${id} not found` });
    }
    res.status(200).json(person);
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    res.status(204).end();
  });

const PORT = 3001;
app.listen(PORT, () => console.log('Server started on port', PORT));
