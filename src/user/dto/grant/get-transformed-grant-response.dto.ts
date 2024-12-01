import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsIn,
  IsArray,
} from 'class-validator';
import { ActionsEnum } from 'src/user/enums/actions.enum';

export class GetTransformedGrantResponseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role?: string;

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
