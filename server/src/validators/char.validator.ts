
import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { CreateCharDto } from 'src/chars/dto/create-char.dto';
import { DbService } from 'src/db/db.service';

@ValidatorConstraint({ name: 'ExistingCharRule', async: true })
@Injectable()
export class ExistingCharRule implements ValidatorConstraintInterface {
  constructor(private db: DbService) { }

  async validate(body: CreateCharDto) {
    const { name, server } = body

    try {
      const namedChars = await this.db.char.findMany({
        where: {
          server
        }
      });
      if (namedChars.length === 0) {
        return true;
      } else {
        const char = namedChars.find(ch => ch.name === name)
        if (!char) return true;
        else return false;
      }
    } catch (e) {
      return false;
    }

  }

  defaultMessage(args: ValidationArguments) {
    return `Char already exists`;
  }
}


/* import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsBiggerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'number' && typeof relatedValue === 'number' && value > relatedValue;
        },
      },
    });
  };
} */