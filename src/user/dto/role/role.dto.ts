import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoles } from 'src/user/user-enums.pb';
import { prettifyFromEnum } from 'src/utils/common';
import { Role } from '../../role.pb';
import { GetGrantResponseDto } from '../grant/get-grant-response.dto';

export class RoleDto implements Role {
  @ApiPropertyOptional({ minimum: 1, maximum: Number.MAX_SAFE_INTEGER })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  id?: number;

  @ApiPropertyOptional({ minLength: 1, maxLength: 250 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name?: string;

  @ApiPropertyOptional({
    enum: UserRoles,
    description: prettifyFromEnum('role', UserRoles),
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;

  @ApiPropertyOptional({ minLength: 1, maxLength: 250 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  icon?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 250 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  color?: string;

  @ApiPropertyOptional({ type: GetGrantResponseDto, isArray: true })
  @IsOptional()
  @Type(() => GetGrantResponseDto)
  grants?: GetGrantResponseDto[];
}
