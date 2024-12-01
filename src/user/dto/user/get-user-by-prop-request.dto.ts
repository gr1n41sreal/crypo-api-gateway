import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { GetUserByPropRequest } from '../../user.pb';
import { prettifyFromEnum } from '../../../utils/common';
import { AvailableUserFilterProps } from '../../user-enums.pb';

export class GetUserByPropRequestDto implements GetUserByPropRequest {
  @ApiProperty({ example: 'test@email.com', default: 'test@email.com' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({
    enum: AvailableUserFilterProps,
    description: prettifyFromEnum('prop', AvailableUserFilterProps),
    default: AvailableUserFilterProps.EMAIL,
  })
  @IsNotEmpty()
  @IsEnum(AvailableUserFilterProps)
  prop: AvailableUserFilterProps;
}
