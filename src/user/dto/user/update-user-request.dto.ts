import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsEmail } from 'src/auth/decorators/is-email.decorator';
import { IsPhone } from 'src/auth/decorators/is-phone.decorator';
import { UpdateUserRequest } from 'src/user/user.pb';

export class UpdateUserRequestDto implements UpdateUserRequest {
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
}
