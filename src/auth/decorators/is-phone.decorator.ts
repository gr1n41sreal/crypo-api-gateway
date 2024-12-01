import { registerDecorator, ValidationOptions } from 'class-validator';
import { phoneRegex } from 'src/utils/common';

export function IsPhone(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsPhone',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Invalid phone format',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return phoneRegex.test(value);
        },
      },
    });
  };
}
