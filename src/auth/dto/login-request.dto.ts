import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from '../decorators/is-password.decorator';
import { IsPhone } from '../decorators/is-phone.decorator';

export class LoginRequestDto {
  @ApiProperty({
    default: '+380964927535',
    example: '+380964927535',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhone()
  phone: string;

  @ApiProperty({ default: 'qwerty123#' })
  @IsNotEmpty()
  @IsString()
  @IsPassword()
  password: string;
}
