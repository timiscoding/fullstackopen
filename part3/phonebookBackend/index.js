require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.route('/api/persons')
  .get((req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()));
    });
  })
  .post((req, res, next) => {
    const { name, number } = req.body;
    if (!name || !number) {
      return next({
        status: 400,
        message: 'name and number must not be blank'
      });
    }

    const person = new Person({
      name,
      number,
    });

    person.save()
      .then(savedPerson => {
        res.status(201).json(savedPerson.toJSON());
      })
      .catch(next);
  });

app.get('/info', (req, res) => {
  Person.countDocuments()
    .then(personLength => {
      res.send(`
        <p>Phonebook has info for ${personLength} people</p>
        <p>${new Date()}</p>`);
    });
});

app.route('/api/persons/:id')
  .get((req, res, next) => {
    Person.findById(req.params.id)
      .then(person => {
        res.json(person.toJSON());
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put((req, res, next) => {
    const body = req.body;
    const person = {
      name: body.name,
      number: body.number,
    };
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(replacedPerson => {
        res.json(replacedPerson.toJSON());
      })
      .catch(next);
  });

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformated id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.message && error.status) {
    return res.status(error.status).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server started on port', PORT));
