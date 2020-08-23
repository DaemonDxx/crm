import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ParseArray } from '../Utils/PipeFucntions/stringToArray.function';

@Injectable()
export class InvitePipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): any {
    const valueTransfom = {
      department: value.department,
      permissions: ParseArray(value.permissions)
    }
    return valueTransfom;
  }

}