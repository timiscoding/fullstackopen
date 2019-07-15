const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongodb');
  })
  .catch(() => {
    console.log('Error connecting to Mongodb');
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
