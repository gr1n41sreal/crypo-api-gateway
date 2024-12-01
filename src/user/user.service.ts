import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ChangeUserRoleRequest,
  CreateUserRequest,
  GetUserByPropRequest,
  GetUserByPropResponse,
  UpdateUserRequest,
  User,
  USER_SERVICE_NAME,
  UserList,
  UserServiceClient,
  ValidatePasswordRequest,
  ValidatePasswordResponse,
} from './user.pb';
import {
  DeleteRoleRequest,
  DeleteRoleResponse,
  GrantList,
  Role,
  ROLE_SERVICE_NAME,
  RoleList,
  RoleServiceClient,
  SetGrantsRequest,
} from './role.pb';
import { GetTransformedGrantResponseDto } from './dto/grant/get-transformed-grant-response.dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceClient: UserServiceClient;

  private roleServiceClient: RoleServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly grpcUserClient: ClientGrpc;

  @Inject(USER_SERVICE_NAME)
  private readonly grpcRoleClient: ClientGrpc;

  public onModuleInit(): void {
    this.userServiceClient =
      this.grpcUserClient.getService<UserServiceClient>(USER_SERVICE_NAME);
    this.roleServiceClient =
      this.grpcRoleClient.getService<RoleServiceClient>(ROLE_SERVICE_NAME);
  }

  public async createUser(body: CreateUserRequest): Promise<User> {
    return firstValueFrom(this.userServiceClient.createUser(body));
  }

  public async getUsers(): Promise<UserList> {
    return firstValueFrom(this.userServiceClient.getUsers({}));
  }

  public async getUserByProp(
    body: GetUserByPropRequest,
  ): Promise<GetUserByPropResponse> {
    return firstValueFrom(
      this.userServiceClient.getUserByProp(body),
    );
  }

  public async updateUser(id: number, body: UpdateUserRequest): Promise<User> {
    return firstValueFrom(
      this.userServiceClient.updateUser({ id, ...body }),
    );
  }

  public async validatePassword(
    body: ValidatePasswordRequest,
  ): Promise<ValidatePasswordResponse> {
    return await firstValueFrom(
      this.userServiceClient.validatePassword(body),
    );
  }

  public async changeUserRole(
    id: number,
    body: ChangeUserRoleRequest,
  ): Promise<User> {
    return await firstValueFrom(
      this.userServiceClient.changeUserRole({ id, ...body }),
    );
  }

  // Roles

  public async createRole(body: Role): Promise<Role> {
    return firstValueFrom(this.roleServiceClient.createRole(body));
  }

  public async getRoles(): Promise<RoleList> {
    return firstValueFrom(this.roleServiceClient.getRoles({}));
  }

  public async getRole(id: number): Promise<Role> {
    return firstValueFrom(this.roleServiceClient.getRole({ id }));
  }

  public async getRolesWithGrant(): Promise<RoleList> {
    return firstValueFrom(this.roleServiceClient.getRolesWithGrant({}));
  }

  public async updateRole(id: number, body: Role): Promise<Role> {
    return firstValueFrom(this.roleServiceClient.updateRole({ id, ...body }));
  }

  public async deleteRole(
    body: DeleteRoleRequest,
  ): Promise<DeleteRoleResponse> {
    return firstValueFrom(this.roleServiceClient.deleteRole(body));
  }

  // Grants

  public async setGrants(body: SetGrantsRequest): Promise<GrantList> {
    return firstValueFrom(this.roleServiceClient.setGrants(body));
  }

  public async getTransformedGrants(): Promise<
    GetTransformedGrantResponseDto[]
  > {
    const data = await this.getRolesWithGrant();

    return data.roles.flatMap((role) => {
      return role.grants.flatMap((grant) => {
        return { ...grant, role: String(grant.role) };
      });
    });
  }

  public async getGrants(): Promise<GrantList> {
    return firstValueFrom(this.roleServiceClient.getGrants({}));
  }
}
