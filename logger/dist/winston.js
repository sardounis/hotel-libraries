'use strict';

var moment = require('moment-timezone');

var _require = require("winston"),
    createLogger = _require.createLogger,
    format = _require.format,
    transports = _require.transports;

var combine = format.combine,
    timestamp = format.timestamp,
    label = format.label,
    json = format.json;


var setOptions = function setOptions(combined) {
  var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user-service';
  var handleExceptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var json = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var maxsize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5242880;
  var maxFiles = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
  var colorize = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

  var options = {
    file: {
      level: "info",
      filename: combined,
      service: service,
      handleExceptions: handleExceptions,
      json: json,
      maxsize: maxsize,
      maxFiles: maxFiles,
      colorize: colorize
    }
  };

  return options;
};

var timezoneTimestamp = format(function (info, opts) {
  if (opts.tz) info.timestamp = moment().tz(opts.tz).format();
  return info;
});

var myLogger = function myLogger(options) {
  return createLogger({
    level: "info",
    label: label,
    format: combine(timezoneTimestamp({ tz: 'EET' }), format.json()),
    defaultMeta: {
      service: options.file.service
    },
    transports: [new transports.File(options.file)]
  });
};

myLogger.stream = {
  write: function write(message, encodi) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    myLogger.info(message);
  }
};

module.exports = {
  myLogger: myLogger,
  setOptions: setOptions
};