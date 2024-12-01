import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { GetRoleResponseDto } from './get-role-response.dto';

export class GetRoleListResponseDto {
  @ApiPropertyOptional({ type: GetRoleResponseDto, isArray: true })
  @IsOptional()
  @Type(() => GetRoleResponseDto)
  roles?: GetRoleResponseDto[];
}
