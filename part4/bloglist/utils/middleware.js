const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message });
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id '});
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).send({ error: 'invalid auth token' });
  }
  logger.error('unhandled server error', err);
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
}

module.exports = { errorHandler, tokenExtractor };
