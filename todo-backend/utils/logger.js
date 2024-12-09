const winston = require('winston');

const transports = [
  new winston.transports.File({ filename: 'combined.log' }),
];

// Add console transport only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports,
});

module.exports = logger;
