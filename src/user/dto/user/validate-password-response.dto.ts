import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidatePasswordResponse } from '../../user.pb';
import { GetUserResponseDto } from './get-user-response.dto';

export class ValidatePasswordResponseDto implements ValidatePasswordResponse {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  success?: boolean;

  @ApiPropertyOptional({ type: GetUserResponseDto })
  @Type(() => GetUserResponseDto)
  @IsOptional()
  @IsObject()
  user?: GetUserResponseDto;
}
