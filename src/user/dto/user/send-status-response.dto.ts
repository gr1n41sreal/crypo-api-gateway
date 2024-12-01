import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { SendStatus } from 'src/user/user.pb';

export class SendStatusResponseDto implements SendStatus {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  success?: boolean;
}
