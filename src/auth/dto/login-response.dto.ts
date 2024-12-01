import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginResponseDto {
  @ApiPropertyOptional({ minLength: 1, maxLength: 250 })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(250)
  accessToken?: string;

  @ApiPropertyOptional({ minLength: 1, maxLength: 250 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  refreshToken?: string;
}
