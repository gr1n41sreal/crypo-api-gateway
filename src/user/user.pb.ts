/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Role } from './role.pb';
import { AvailableUserFilterProps, UserRoles } from './user-enums.pb';

export const protobufPackage = 'crypo.user';

export interface UserList {
  users?: User[] | undefined;
}

export interface User {
  id?: number | undefined;
  isActive?: boolean | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  role?: Role | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface CreateUserRequest {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  role?: UserRoles | undefined;
}

export interface GetUserByPropRequest {
  prop?: AvailableUserFilterProps | undefined;
  value?: string | undefined;
}

export interface GetUserByPropResponse {
  user?: User | undefined;
}

export interface UpdateUserRequest {
  id?: number | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export interface ValidatePasswordRequest {
  phone?: string | undefined;
  password?: string | undefined;
}

export interface ValidatePasswordResponse {
  user?: User | undefined;
  success?: boolean | undefined;
}

export interface ChangeUserRoleRequest {
  id?: number | undefined;
  role?: UserRoles | undefined;
}

export interface SendStatus {
  success?: boolean | undefined;
}

export interface Stub {}

export const CRYPO_USER_PACKAGE_NAME = 'crypo.user';

export interface UserServiceClient {
  /** User */

  createUser(request: CreateUserRequest, metadata?: Metadata): Observable<User>;

  getUsers(request: Stub, metadata?: Metadata): Observable<UserList>;

  getUserByProp(
    request: GetUserByPropRequest,
    metadata?: Metadata,
  ): Observable<GetUserByPropResponse>;

  updateUser(request: UpdateUserRequest, metadata?: Metadata): Observable<User>;

  validatePassword(
    request: ValidatePasswordRequest,
    metadata?: Metadata,
  ): Observable<ValidatePasswordResponse>;

  changeUserRole(
    request: ChangeUserRoleRequest,
    metadata?: Metadata,
  ): Observable<User>;
}

export interface UserServiceController {
  /** User */

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;

  getUsers(
    request: Stub,
    metadata?: Metadata,
  ): Promise<UserList> | Observable<UserList> | UserList;

  getUserByProp(
    request: GetUserByPropRequest,
    metadata?: Metadata,
  ):
    | Promise<GetUserByPropResponse>
    | Observable<GetUserByPropResponse>
    | GetUserByPropResponse;

  updateUser(
    request: UpdateUserRequest,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;

  validatePassword(
    request: ValidatePasswordRequest,
    metadata?: Metadata,
  ):
    | Promise<ValidatePasswordResponse>
    | Observable<ValidatePasswordResponse>
    | ValidatePasswordResponse;

  changeUserRole(
    request: ChangeUserRoleRequest,
    metadata?: Metadata,
  ): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'getUsers',
      'getUserByProp',
      'updateUser',
      'validatePassword',
      'changeUserRole',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
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
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';
