import { registerDecorator, ValidationOptions } from 'class-validator';
import { EmailValidator } from '../../utils/validators/email.validator'

export function IsEmail(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Invalid email format',
        ...validationOptions,
      },
      validator: EmailValidator,
    });
  };
}
