import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEmail } from 'src/auth/decorators/is-email.decorator';
import { IsPhone } from 'src/auth/decorators/is-phone.decorator';
import { RoleDto } from '../role/role.dto';
import { User } from '../../user.pb';

export class UserDto implements User {
  @ApiPropertyOptional({ minimum: 1, maximum: Number.MAX_SAFE_INTEGER })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsPhone()
  phone?: string;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto;
}
