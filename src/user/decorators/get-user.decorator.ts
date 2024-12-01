import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryUser } from 'src/auth/auth.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): QueryUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
