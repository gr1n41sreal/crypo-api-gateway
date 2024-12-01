import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: {
        message: 'Invalid password format',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }

          // Check length
          if (value.length < 8 || value.length > 255) {
            return false;
          }

          // Check numbers and special characters
          const hasNumber = /(?=.*\d)/.test(value);
          const hasSpecialCharacter =
            // eslint-disable-next-line unicorn/better-regex
            /(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])/.test(value);
          return hasNumber && hasSpecialCharacter;
        },
      },
    });
  };
}
