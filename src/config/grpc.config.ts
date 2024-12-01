import { resolve } from 'node:path';

import { registerAs } from '@nestjs/config';
import { HEALTH_CHECK_PACKAGE_NAME } from '../health-check/health-check.pb';
import { CRYPO_AUTH_PACKAGE_NAME } from '../auth/auth.pb';
import { CRYPO_USER_PACKAGE_NAME } from '../user/user.pb';
import { CRYPO_ROLE_PACKAGE_NAME } from '../user/role.pb';

export default registerAs('grpc', () => ({
  auth: {
    url: process.env.GRPC_AUTH_SERVICE_HOST || '0.0.0.0:50051',
    package: [CRYPO_AUTH_PACKAGE_NAME, HEALTH_CHECK_PACKAGE_NAME],
    protoPath: [
      resolve(__dirname, '../_proto/auth/auth.proto'),
      resolve(__dirname, '../_proto/health-check/health-check.proto'),
    ],
    loader: {
      keepCase: false,
      longs: String,
      defaults: true,
      oneofs: true,
    },
  },
  user: {
    url: process.env.GRPC_USER_SERVICE_HOST || '0.0.0.0:50052',
    package: [
      HEALTH_CHECK_PACKAGE_NAME,
      CRYPO_USER_PACKAGE_NAME,
      CRYPO_ROLE_PACKAGE_NAME,
    ],
    protoPath: [
      resolve(__dirname, '../_proto/health-check/health-check.proto'),
      resolve(__dirname, '../_proto/user/user.proto'),
      resolve(__dirname, '../_proto/user/user-enums.proto'),
      resolve(__dirname, '../_proto/user/role.proto'),
    ],
    loader: {
      keepCase: false,
      longs: String,
      oneofs: true,
      defaults: false,
      arrays: true,
    },
  },
}));
