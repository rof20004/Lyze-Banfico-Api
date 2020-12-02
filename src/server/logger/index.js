// @flow

import pino from 'pino';
import config from 'config';


const pretty = !config.PRODUCTION;

const logger = pino ({
	prettyPrint: pretty ? {
		ignore: 'hostname,pid',
		translateTime: 'yyyy-mm-dd HH:MM:ss.l',
		colorize: false
	} : false
});

process.on ('uncaughtException',
	pino.final (logger, (err, finalLogger) => {
		finalLogger.error (err, 'uncaughtException');
		process.exit (1);
	}));

process.on ('unhandledRejection',
	pino.final (logger, (err, finalLogger) => {
		finalLogger.error (err, 'unhandledRejection');
		process.exit (1);
	}));

export default logger;

