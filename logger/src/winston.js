const moment = require('moment-timezone');
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, json } = format;

const setOptions = (combined, service = 'user-service', handleExceptions = true, json = true, maxsize = 5242880, maxFiles = 5, colorize = false) => {
  let options = {
    file: {
      level: "info",
      filename: combined, 
      service,
      handleExceptions,
      json,
      maxsize,
      maxFiles,
      colorize
    },
  };

  return options;
};


const timezoneTimestamp = format((info, opts) => {
  if(opts.tz)
    info.timestamp = moment().tz(opts.tz).format();
  return info;
});

const myLogger = (options) => {
  return createLogger(
    {
    level: "info",
    label,
    format: combine(
      timezoneTimestamp({ tz: 'EET' }),
      format.json()
    ),
    defaultMeta: {
      service: options.file.service
    },
    transports: [
      new transports.File(options.file)
    ]
  }
  );
}

myLogger.stream = {
  write: (message, encodi) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    myLogger.info(message);
  }
};



module.exports = {
  myLogger,
  setOptions,
};
