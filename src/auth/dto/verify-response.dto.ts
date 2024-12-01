import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class VerifyResponseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isValid?: boolean;
}
