import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from 'src/user/user-enums.pb';
import { prettifyFromEnum } from 'src/utils/common';

export class ChangeUserRoleRequestDto {
  @ApiProperty({
    enum: UserRoles,
    description: prettifyFromEnum('role', UserRoles),
    default: UserRoles.USER,
  })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}
