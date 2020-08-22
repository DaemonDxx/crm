import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class InvitePipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): any {
    const valueTransfom = {
      department: value.department,
      permissions: this.getArray(value.permissions)
    }
    return valueTransfom;
  }

  getArray(value: string): string[] {
    //Todo Заменить на регулярные выражения
    const tr = value.replace('[', '');
    const tr1 = tr.replace(']', '');
    return tr1.split(',');

  }

}