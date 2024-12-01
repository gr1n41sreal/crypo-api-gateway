import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { AccessToken } from '../auth.pb';

export class VerifyRequestDto implements AccessToken {
  @ApiProperty({ minLength: 1, maxLength: 250 })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  accessToken: string;
}
