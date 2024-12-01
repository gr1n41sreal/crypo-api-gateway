import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { AUTHORIZATION_SERVICE_NAME } from '../auth/auth.pb';
import { USER_SERVICE_NAME } from '../user/user.pb';
import grpcOptions from '../config/grpc.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTHORIZATION_SERVICE_NAME,
        useFactory: async (config: ConfigType<typeof grpcOptions>) => ({
          transport: Transport.GRPC,
          options: config.auth,
        }),
        inject: [grpcOptions.KEY],
      },
      {
        name: USER_SERVICE_NAME,
        useFactory: async (config: ConfigType<typeof grpcOptions>) => ({
          transport: Transport.GRPC,
          options: config.user,
        }),
        inject: [grpcOptions.KEY],
      },
    ]),
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
