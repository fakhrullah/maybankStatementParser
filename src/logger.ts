import pino from 'pino';

const pinoConfig = () => {
  if (process.env.LOG_PRETTY) {
    return {
      transport: {
        target: 'pino-pretty',
      },
    };
  }
  return {};
};

const logger = pino(pinoConfig());

export default logger;
