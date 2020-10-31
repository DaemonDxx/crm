import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const object = plainToClass(metadata.metatype, value);
    const error = await validate(object);
    if (error.length > 0) {
      throw new BadRequestException(error);
    }
    return value;
  }


  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

}