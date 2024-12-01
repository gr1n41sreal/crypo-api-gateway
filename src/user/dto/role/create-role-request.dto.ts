import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'src/user/user-enums.pb';
import { prettifyFromEnum } from 'src/utils/common';

export class CreateRoleRequestDto {
  @ApiProperty({ minLength: 1, maxLength: 250, default: 'rolename' })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    enum: UserRoles,
    description: prettifyFromEnum('role', UserRoles),
    default: UserRoles.USER,
  })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty({ minLength: 1, maxLength: 250, default: 'mdi-icon' })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  icon: string;

  @ApiProperty({ minLength: 1, maxLength: 250, default: '#fff' })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  color: string;
}
