import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ActionsEnum } from 'src/user/enums/actions.enum';
import { Grant } from '../../role.pb';

export class AddGrantRequestDto implements Grant {
  @ApiProperty({ minLength: 1, maxLength: 250, default: '*' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  resource: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 250,
    default: ActionsEnum.CREATE_OWN,
  })
  @IsNotEmpty()
  @IsEnum(ActionsEnum)
  action: ActionsEnum;

  @ApiProperty({ type: String, isArray: true, default: ['*'] })
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  attributes: string[];
}
