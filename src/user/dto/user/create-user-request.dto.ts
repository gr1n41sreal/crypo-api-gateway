import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsEmail } from 'src/auth/decorators/is-email.decorator';
import { IsPassword } from 'src/auth/decorators/is-password.decorator';
import { IsPhone } from 'src/auth/decorators/is-phone.decorator';
import { UserRoles } from 'src/user/user-enums.pb';
import { prettifyFromEnum } from '../../../utils/common';

export class CreateUserRequestDto {
  @ApiPropertyOptional({ default: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ default: 'Smith' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'test@email.com', default: 'test@email.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+380964927535', default: '+380964927535' })
  @IsOptional()
  @IsString()
  @IsPhone()
  phone?: string;

  @ApiPropertyOptional({ default: 'qwerty123#' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password?: string;

  @ApiPropertyOptional({
    enum: UserRoles,
    description: prettifyFromEnum('role', UserRoles),
    default: UserRoles.USER,
  })
  @IsEnum(UserRoles)
  role: UserRoles;
}
