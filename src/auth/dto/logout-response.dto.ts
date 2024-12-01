import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class LogoutResponseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  success?: boolean;
}
