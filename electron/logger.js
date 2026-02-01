import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

const transport = isDev
  ? pino.transport({
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard' },
    })
  : undefined;

const logger = transport
  ? pino({ level: process.env.LOG_LEVEL || 'debug' }, transport)
  : pino({ level: process.env.LOG_LEVEL || 'info' });

export default logger;
