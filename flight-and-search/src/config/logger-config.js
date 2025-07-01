const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;


const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} : ${level} : ${message}`;
  });

const logger = createLogger({
    format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      customFormat
    ),
    transports: [
        new transports.Console(), // prints the log on console
        new transports.File({filename: 'combined.log'})    // save all the logs in a file named "combined.log"
    ]
  });

  module.exports = logger;