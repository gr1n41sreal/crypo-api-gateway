import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RefreshAccessTokenRequestDto {
  @ApiProperty({ minLength: 1, maxLength: 250 })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  refreshToken: string;
}
