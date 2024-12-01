import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { SetGrantsRequest } from 'src/user/role.pb';
import { GrantDto } from '../grant/grant.dto';

export class AddGrantsToRoleRequestDto implements SetGrantsRequest {
  @ApiProperty({ minLength: 1, maxLength: 250, default: 2 })
  @IsNotEmpty()
  @IsNumber()
  @MinLength(1)
  @MaxLength(250)
  roleId: number;

  @ApiProperty({ type: GrantDto, isArray: true })
  @IsNotEmpty()
  @Type(() => GrantDto)
  grants: GrantDto[];
}
