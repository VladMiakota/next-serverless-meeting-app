const pino = require('pino')
const pinoOptions = require('../utils/pino.options')

const logService = pino(pinoOptions);

const info = (message) => logService.info(message);
const error = (message) => logService.error(message);

module.exports = {
  info,
  error
}
