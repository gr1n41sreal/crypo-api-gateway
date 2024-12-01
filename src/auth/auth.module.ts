import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigType } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTHORIZATION_SERVICE_NAME } from './auth.pb';
import grpcOptions from '../config/grpc.config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTHORIZATION_SERVICE_NAME,
        useFactory: async (config: ConfigType<typeof grpcOptions>) => ({
          transport: Transport.GRPC,
          options: config.auth,
        }),
        inject: [grpcOptions.KEY],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
