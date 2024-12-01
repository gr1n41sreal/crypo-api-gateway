import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { GetRoleRequest } from 'src/user/role.pb';

export class GetRoleRequestDto implements GetRoleRequest {
  @ApiPropertyOptional({ minLength: 1, maxLength: 250, default: 1 })
  @IsOptional()
  @MinLength(1)
  @MaxLength(250)
  id?: number;
}
