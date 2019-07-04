import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mongoDate'
})
export class MongoDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if ( args ) {

      if ( args === 'date' ) {
        return value.substring( 0, 10 );
      }

      if ( args === 'hour' ) {
        return value.substr( 11, 8 );
      }

    }

    return value;
  }

}
