import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigType } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { USER_SERVICE_NAME } from './user.pb';
import grpcOptions from '../config/grpc.config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
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
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
