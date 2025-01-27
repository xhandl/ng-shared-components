import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'xhJson'
})
export class JsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }
}
