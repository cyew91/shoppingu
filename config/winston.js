'use strict';

/**
 * Created by Junaid Anwar on 5/28/15.
 */
var winston = require('winston');

const logger = winston.createLogger({
    level: 'verbose',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            prettyPrint: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'combined.log',
            level: 'verbose'
        })
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;