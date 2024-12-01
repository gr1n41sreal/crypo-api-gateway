/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserRoles } from './user-enums.pb';

export const protobufPackage = 'crypo.role';

export interface RoleList {
  roles?: Role[] | undefined;
}

export interface Role {
  id?: number | undefined;
  name?: string | undefined;
  role?: UserRoles | undefined;
  icon?: string | undefined;
  color?: string | undefined;
  grants?: Grant[] | undefined;
}

export interface GetRoleRequest {
  id?: number | undefined;
}

export interface DeleteRoleRequest {
  id?: number | undefined;
}

export interface DeleteRoleResponse {
  success?: boolean | undefined;
}

export interface GrantList {
  grants?: Grant[] | undefined;
}

export interface Grant {
  role?: UserRoles | undefined;
  resource?: string | undefined;
  action?: string | undefined;
  attributes?: string[] | undefined;
}

export interface SetGrantsRequest {
  roleId?: number | undefined;
  grants?: SetGrantByRole[] | undefined;
}

export interface SetGrantByRole {
  resource?: string | undefined;
  action?: string | undefined;
  attributes?: string[] | undefined;
}

export interface Stub {}

export const CRYPO_ROLE_PACKAGE_NAME = 'crypo.role';

export interface RoleServiceClient {
  /** Roles */

  createRole(request: Role, metadata?: Metadata): Observable<Role>;

  getRoles(request: Stub, metadata?: Metadata): Observable<RoleList>;

  getRole(request: GetRoleRequest, metadata?: Metadata): Observable<Role>;

  getRolesWithGrant(request: Stub, metadata?: Metadata): Observable<RoleList>;

  updateRole(request: Role, metadata?: Metadata): Observable<Role>;

  deleteRole(
    request: DeleteRoleRequest,
    metadata?: Metadata,
  ): Observable<DeleteRoleResponse>;

  /** Grants */

  setGrants(request: SetGrantsRequest, metadata?: Metadata): Observable<Role>;

  getGrants(request: Stub, metadata?: Metadata): Observable<GrantList>;

  getGrantByRole(
    request: GetRoleRequest,
    metadata?: Metadata,
  ): Observable<GrantList>;
}

export interface RoleServiceController {
  /** Roles */

  createRole(
    request: Role,
    metadata?: Metadata,
  ): Promise<Role> | Observable<Role> | Role;

  getRoles(
    request: Stub,
    metadata?: Metadata,
  ): Promise<RoleList> | Observable<RoleList> | RoleList;

  getRole(
    request: GetRoleRequest,
    metadata?: Metadata,
  ): Promise<Role> | Observable<Role> | Role;

  getRolesWithGrant(
    request: Stub,
    metadata?: Metadata,
  ): Promise<RoleList> | Observable<RoleList> | RoleList;

  updateRole(
    request: Role,
    metadata?: Metadata,
  ): Promise<Role> | Observable<Role> | Role;

  deleteRole(
    request: DeleteRoleRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteRoleResponse>
    | Observable<DeleteRoleResponse>
    | DeleteRoleResponse;

  /** Grants */

  setGrants(
    request: SetGrantsRequest,
    metadata?: Metadata,
  ): Promise<Role> | Observable<Role> | Role;

  getGrants(
    request: Stub,
    metadata?: Metadata,
  ): Promise<GrantList> | Observable<GrantList> | GrantList;

  getGrantByRole(
    request: GetRoleRequest,
    metadata?: Metadata,
  ): Promise<GrantList> | Observable<GrantList> | GrantList;
}

export function RoleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createRole',
      'getRoles',
      'getRole',
      'getRolesWithGrant',
      'updateRole',
      'deleteRole',
      'setGrants',
      'getGrants',
      'getGrantByRole',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('RoleService', method)(
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
      GrpcStreamMethod('RoleService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ROLE_SERVICE_NAME = 'RoleService';
