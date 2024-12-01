import { registerAs } from '@nestjs/config';
import { LogLevel } from '../utils/validators/env.validation';

export default registerAs('app', () => ({
    name: process.env.APP_NAME,
    workingDirectory: process.env.PWD || process.cwd(),
    nodeEnv: process.env.NODE_ENV,
    logLevel: process.env.LOG_LEVEL || LogLevel.Warn,
    logFile: process.env.LOG_FILE || 'app.log',
    url: `${process.env.APP_IP}:${process.env.APP_PORT}` || '0.0.0.0:3000',
}));
