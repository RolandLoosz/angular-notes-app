import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listPipe'
})
export class ListPipePipe implements PipeTransform {

  transform(value: any) {
    return 'created: ' + value;
  }

}
