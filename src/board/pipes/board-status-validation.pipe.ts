import { BoardStatus } from './../board.model';
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class BoardStatusValidationPipe implements PipeTransform {
  //   transform(value: any, metadata: ArgumentMetadata) {
  //     console.log('value', value); //value：自己输入的更改
  //     console.log('metadate', metadata); //metadata： { metatype: [Function: String], type: 'body', data: 'status'
  //     return value;
  //   }
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not an option in the status`);
    }
    return value;
  }

  private isStatusValid(status) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
