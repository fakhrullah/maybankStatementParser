import pino from 'pino';

const pinoConfig = (): pino.LoggerOptions => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  if (process.env.LOG_PRETTY) {
    return {
      transport: {
        target: 'pino-pretty',
      },
      level: logLevel,
    };
  }
  return {
    level: logLevel,
  };
};

const logger = pino(pinoConfig());

export default logger;
