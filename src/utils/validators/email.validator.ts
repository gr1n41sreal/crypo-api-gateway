import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { emailRegex } from '../common';

@ValidatorConstraint({ name: 'EmailValidator' })
@Injectable()
export class EmailValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    return emailRegex.test(value);
  }
}
