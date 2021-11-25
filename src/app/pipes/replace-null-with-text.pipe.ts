import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceNullWithText'
})
export class ReplaceNullWithTextPipe implements PipeTransform {

  transform(value: unknown, repleceText: string = 'N/A'): unknown {
    if (typeof value === 'undefined' || value === null) {
      return repleceText;
    }

    return value;
  }

}
