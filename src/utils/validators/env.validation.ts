import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPort,
    Min,
    ValidateIf,
} from 'class-validator';
import { Logger } from '@nestjs/common';

const logger = new Logger('env.validation');


export enum LogLevel {
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
    Verbose = 'verbose',
}

export enum Environment {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

class EnvironmentVariables {
    @IsNotEmpty()
    @IsEnum(Environment, {
        message: `NODE_ENV must be one of ${Object.values(Environment).join(', ')}`,
    })
    public NODE_ENV: Environment;

    @IsNotEmpty()
    @IsPort()
    APP_PORT: string;

    @IsNotEmpty()
    APP_IP: string;

    // Throttle configuration

    @IsNumber()
    @Min(1)
    THROTTLE_TTL: number;

    @IsNumber()
    @Min(1)
    THROTTLE_LIMIT: number;

    // Logger configuration

    @IsEnum(LogLevel, {
        message: `LOG_LEVEL must be one of: [${Object.values(LogLevel)}]`,
    })
    LOG_LEVEL: string;

    @ValidateIf((o) => o.NODE_ENV === Environment.Production)
    @IsNotEmpty()
    LOG_FILE: string;

}