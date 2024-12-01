import {
  Body,
  Controller,
  HttpStatus,
  Ip,
  Logger,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RpcExceptionFilter } from '../utils/filters/grpc-exception.filter';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { VerifyRequestDto } from './dto/verify-request.dto';
import { VerifyResponseDto } from './dto/verify-response.dto';
import { RefreshAccessTokenResponseDto } from './dto/refresh-access-token-response.dto';
import { RefreshAccessTokenRequestDto } from './dto/refresh-access-token-request.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { AuthGuard } from './auth.guard';
import { GetAccessToken } from './decorators/get-access-token.decorator';
import { AuthorizationTokens, LoginRequest } from './auth.pb';

@ApiTags('auth')
@Controller('auth')
@UseFilters(RpcExceptionFilter)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiResponse({
    type: LoginResponseDto,
    status: HttpStatus.CREATED,
  })
  async login(
    @Body() loginRequest: LoginRequestDto,
    @Ip() userIp: string,
  ): Promise<LoginResponseDto> {
    this.logger.debug(`loginRequest: ${JSON.stringify(loginRequest)}`);

    const validateResponse = await this.userService.validatePassword(
      loginRequest,
    );
    if (
      !validateResponse ||
      !validateResponse.user ||
      !validateResponse.success
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const data = {
      userIp,
      userId: validateResponse.user.id,
      userRole: validateResponse.user.role.role,
    };

    return this.loginUser(data);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({
    type: LogoutResponseDto,
    status: HttpStatus.OK,
  })
  async logout(
    @GetAccessToken() accessToken: string,
  ): Promise<LogoutResponseDto> {
    this.logger.debug(`logoutRequest: ${JSON.stringify(accessToken)}`);
    return this.authService.logout({ accessToken });
  }

  @Post('/verify')
  @ApiOperation({ summary: 'Verify access token' })
  @ApiBody({
    type: VerifyRequestDto,
  })
  @ApiResponse({
    type: VerifyResponseDto,
    status: HttpStatus.OK,
  })
  async verify(
    @Body() verifyRequest: VerifyRequestDto,
  ): Promise<VerifyResponseDto> {
    const { accessToken } = verifyRequest;

    this.logger.debug(`accessToken: ${accessToken}`);

    return this.authService.verify(verifyRequest);
  }

  @Post('/refresh-access-token')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiBody({
    type: RefreshAccessTokenRequestDto,
  })
  @ApiResponse({
    type: RefreshAccessTokenResponseDto,
    status: HttpStatus.CREATED,
  })
  async refreshAccessToken(
    @Body() loginRequest: RefreshAccessTokenRequestDto,
  ): Promise<RefreshAccessTokenResponseDto> {
    this.logger.debug(`loginRequest: ${JSON.stringify(loginRequest)}`);
    return this.authService.refreshAccessToken({
      refreshToken: loginRequest.refreshToken,
    });
  }


  private async loginUser(data: LoginRequest): Promise<AuthorizationTokens> {
    return this.authService.login(data);
  }

}
