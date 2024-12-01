import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AccessToken,
  AUTHORIZATION_SERVICE_NAME,
  AuthorizationClient,
  AuthorizationTokens,
  LoginRequest,
  LogoutByUserIdRequest,
  RefreshToken,
  SendStatus,
  VerifyResponse,
} from './auth.pb';

@Injectable()
export class AuthService implements OnModuleInit {
  private svc: AuthorizationClient;

  constructor(
    @Inject(AUTHORIZATION_SERVICE_NAME)
    private readonly grpcAuthClient: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.svc = this.grpcAuthClient.getService<AuthorizationClient>(
      AUTHORIZATION_SERVICE_NAME,
    );
  }

  // Auth

  public login(data: LoginRequest): Promise<AuthorizationTokens> {
    return firstValueFrom(this.svc.login(data));
  }

  public logout(request: AccessToken): Promise<SendStatus> {
    return firstValueFrom(this.svc.logout(request));
  }

  public logoutByUserId(request: LogoutByUserIdRequest): Promise<SendStatus> {
    return firstValueFrom(this.svc.logoutByUserId(request));
  }

  public verify(request: AccessToken): Promise<VerifyResponse> {
    return firstValueFrom(this.svc.verify(request));
  }

  public refreshAccessToken(
    request: RefreshToken,
  ): Promise<AuthorizationTokens> {
    return firstValueFrom(this.svc.refreshAccessToken(request));
  }
}
