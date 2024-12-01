/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'crypo.auth';

export interface AccessToken {
  accessToken?: string | undefined;
}

export interface RefreshToken {
  refreshToken?: string | undefined;
}

export interface AuthorizationTokens {
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}

export interface LoginRequest {
  userId?: number | undefined;
  userIp?: string | undefined;
  userRole?: number | undefined;
}

export interface LogoutByUserIdRequest {
  userId?: number | undefined;
}

export interface LogoutResponse {
  success?: boolean | undefined;
}

export interface VerifyResponse {
  isValid?: boolean | undefined;
}

export interface SendStatus {
  success?: boolean | undefined;
}

export interface Stub {}

export const CRYPO_AUTH_PACKAGE_NAME = 'crypo.auth';

export interface AuthorizationClient {
  /** Auth */

  login(
    request: LoginRequest,
    metadata?: Metadata,
  ): Observable<AuthorizationTokens>;

  logout(request: AccessToken, metadata?: Metadata): Observable<LogoutResponse>;

  logoutByUserId(
    request: LogoutByUserIdRequest,
    metadata?: Metadata,
  ): Observable<LogoutResponse>;

  verify(request: AccessToken, metadata?: Metadata): Observable<VerifyResponse>;

  refreshAccessToken(
    request: RefreshToken,
    metadata?: Metadata,
  ): Observable<AuthorizationTokens>;
}

export interface AuthorizationController {
  /** Auth */

  login(
    request: LoginRequest,
    metadata?: Metadata,
  ):
    | Promise<AuthorizationTokens>
    | Observable<AuthorizationTokens>
    | AuthorizationTokens;

  logout(
    request: AccessToken,
    metadata?: Metadata,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  logoutByUserId(
    request: LogoutByUserIdRequest,
    metadata?: Metadata,
  ): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  verify(
    request: AccessToken,
    metadata?: Metadata,
  ): Promise<VerifyResponse> | Observable<VerifyResponse> | VerifyResponse;

  refreshAccessToken(
    request: RefreshToken,
    metadata?: Metadata,
  ):
    | Promise<AuthorizationTokens>
    | Observable<AuthorizationTokens>
    | AuthorizationTokens;
}

export function AuthorizationControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'login',
      'logout',
      'logoutByUserId',
      'verify',
      'refreshAccessToken',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('Authorization', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('Authorization', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTHORIZATION_SERVICE_NAME = 'Authorization';
