import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { prettifyFromEnum } from 'src/utils/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { QueryUser } from 'src/auth/auth.interface';
import { RpcExceptionFilter } from '../utils/filters/grpc-exception.filter';
import { UserService } from './user.service';
import { GetUserListResponseDto } from './dto/user/get-user-list-response.dto';
import { CreateUserRequestDto } from './dto/user/create-user-request.dto';
import { CreateUserResponseDto } from './dto/user/create-user-response.dto';
import { UpdateUserRequestDto } from './dto/user/update-user-request.dto';
import { UpdateUserResponseDto } from './dto/user/update-user-response.dto';
import { GetUserResponseDto } from './dto/user/get-user-response.dto';
import { GetGrantListResponseDto } from './dto/grant/get-grant-list-response.dto';
import { GetRoleListResponseDto } from './dto/role/get-role-list-response.dto';
import { ChangeUserRoleRequestDto } from './dto/user/change-user-role-request.dto';
import { GetUser } from './decorators/get-user.decorator';
import { AvailableUserFilterProps, UserRoles } from './user-enums.pb';


@ApiTags('user')
@UseFilters(RpcExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // User

  @Post()
  // TODO: Temporary public endpoint
  @ApiOperation({
    summary: 'Create user | TEMPORARILY PUBLIC ENDPOINT',
    description: prettifyFromEnum('role', UserRoles),
  })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @ApiResponse({
    type: CreateUserResponseDto,
    status: HttpStatus.CREATED,
  })
  async createUser(
    @Body() body: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(body);
  }

  @Get()
  // TODO: Temporary public endpoint
  @ApiOperation({
    summary: 'Get users with role | TEMPORARILY PUBLIC ENDPOINT',
  })
  @ApiResponse({ type: GetUserListResponseDto })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user with role by token' })
  @ApiResponse({ type: GetUserResponseDto })
  async getUserByToken(
    @GetUser() { userId },
  ) {
    return this.userService.getUserByProp({
      prop: AvailableUserFilterProps.ID,
      value: userId,
    });
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user with role by id' })
  @ApiResponse({ type: GetUserResponseDto })
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.userService.getUserByProp({
      prop: AvailableUserFilterProps.ID,
      value: String(id),
    });
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateUserRequestDto,
  })
  @ApiResponse({
    type: UpdateUserResponseDto,
    status: HttpStatus.OK,
  })
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateUserRequestDto,
    @GetUser() user: QueryUser,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateUser(id, body);
  }

  @Patch('/:id/change-role')
  @ApiBearerAuth()
  // TODO: Temporary public endpoint
  @ApiOperation({
    summary: 'Change user role by userId | TEMPORARILY PUBLIC ENDPOINT',
    description: prettifyFromEnum('role', UserRoles),
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: ChangeUserRoleRequestDto })
  @ApiResponse({ type: GetUserResponseDto })
  async changeUserRole(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: ChangeUserRoleRequestDto,
  ) {
    const response = await this.userService.changeUserRole(id, body);
    await this.authService.logoutByUserId({ userId: id });
    return response;
  }

  // Role & Grant

  @Get('/role')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all roles without grants',
  })
  @ApiResponse({ type: GetRoleListResponseDto })
  async getRoles() {
    return this.userService.getRoles();
  }

  @Get('/grant')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all grants' })
  @ApiResponse({ type: GetGrantListResponseDto })
  async getGrants() {
    return this.userService.getGrants();
  }

  @Get('/roles-with-grants')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all roles with grants',
  })
  @ApiResponse({ type: GetRoleListResponseDto })
  async getRolesWithGrants() {
    return this.userService.getRolesWithGrant();
  }
}
