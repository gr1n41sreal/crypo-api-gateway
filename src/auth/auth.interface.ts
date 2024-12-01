export interface TokenPayload {
  userId: number;
  userRole: number;
}

export interface QueryUser {
  userId: number;
  roles: string[];
}
