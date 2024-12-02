const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Write logs to the console
    new winston.transports.Console(),
    // Write logs to a file
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
