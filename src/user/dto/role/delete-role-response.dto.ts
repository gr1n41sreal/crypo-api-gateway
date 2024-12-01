import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { DeleteRoleResponse } from 'src/user/role.pb';

export class DeleteRoleResponseDto implements DeleteRoleResponse {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  success?: boolean;
}
