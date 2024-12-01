import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { GetGrantResponseDto } from './get-grant-response.dto';

export class GetGrantListResponseDto {
  @ApiPropertyOptional({ type: GetGrantResponseDto, isArray: true })
  @IsOptional()
  @Type(() => GetGrantResponseDto)
  grants?: GetGrantResponseDto[];
}
