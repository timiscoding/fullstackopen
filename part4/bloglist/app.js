const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('Connected to Mongodb');
  })
  .catch(() => {
    logger.error('Error connecting to Mongodb');
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
