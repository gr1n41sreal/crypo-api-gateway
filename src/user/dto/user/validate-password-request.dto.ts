import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/auth/decorators/is-password.decorator';
import { ValidatePasswordRequest } from '../../user.pb';
import { IsPhone } from '../../../auth/decorators/is-phone.decorator';

export class ValidatePasswordRequestDto implements ValidatePasswordRequest {

  @ApiProperty({ example: '+380964927535', default: '+380964927535' })
  @IsNotEmpty()
  @IsString()
  @IsPhone()
  value: string;

  @ApiProperty({ default: 'qwerty123#' })
  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password: string;
}
