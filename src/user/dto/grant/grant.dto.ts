import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { prettifyFromEnum } from 'src/utils/common';
import { UserRoles } from 'src/user/user-enums.pb';
import { Grant } from '../../role.pb';
import { ActionsEnum } from '../../enums/actions.enum';

export class GrantDto implements Grant {
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
  resource?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(Object.values(ActionsEnum))
  action?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  attributes?: string[];
}
