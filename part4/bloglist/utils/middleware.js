const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id '});
  }
  logger.error('unhandled server error', err);
  next(err);
};

module.exports = { errorHandler };
