import { DeleteRoleRequest } from 'src/user/role.pb';
import { GetRoleRequestDto } from './get-role-request.dto';

export class DeleteRoleRequestDto
  extends GetRoleRequestDto
  implements DeleteRoleRequest {}
