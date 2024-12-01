import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsObject } from 'class-validator';
import { GetUserResponseDto } from './get-user-response.dto';

export class GetUserListResponseDto {
  @ApiPropertyOptional({ type: GetUserResponseDto, isArray: true })
  @Type(() => GetUserResponseDto)
  @IsOptional()
  @IsObject()
  users?: GetUserResponseDto[];
}
