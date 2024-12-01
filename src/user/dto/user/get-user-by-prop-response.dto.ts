import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { GetUserResponseDto } from './get-user-response.dto';

export class GetUserByPropResponseDto {
  @ApiPropertyOptional({ type: GetUserResponseDto })
  @Type(() => GetUserResponseDto)
  @IsOptional()
  @IsObject()
  user?: GetUserResponseDto;
}
