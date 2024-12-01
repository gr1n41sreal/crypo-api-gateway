import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';
import { TokenPayload } from './auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    const prefix = 'Bearer ';
    const accessToken = request.headers.authorization.replace(prefix, '');
    console.log(await jwtDecode(accessToken));
    try {
      const verify = await this.authService.verify({ accessToken });
      const { userId, userRole } = jwtDecode<TokenPayload>(accessToken);
      // Nest Access not allow to use roles as numbers
      request.user = { userId, roles: [String(userRole)] };
      // console.log(request.user);
      // console.log(verify.isValid);
      return verify.isValid;
    } catch (error) {
      console.log(error);
    }

    return false;
  }
}
