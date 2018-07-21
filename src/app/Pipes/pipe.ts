import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// filter for multiple values

@Pipe({
    name: 'filter',
     pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: any, isAnd: boolean): any {
  
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (isAnd) {
        console.log("1");
        return items.filter(item =>
            filterKeys.reduce((memo, keyName) =>
                (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
         
        return items.filter(item => {
          return filterKeys.some((keyName) => {           
            return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
          });
        });
      }
    } else {
      return items;
    }
  }
}

// Sort according to number

@Pipe({
    name: 'sortBy'
})

export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        console.log('sortedBy', sortedBy);
        
        return items.sort((a, b) => {return b[sortedBy] - a[sortedBy]});
    }
}


// sort by date

@Pipe({
    name: 'orderBy'
})
export class OrderByDate implements PipeTransform {

        transform(array: Array<any>, args: string): Array<any> {
        if (typeof args[0] === "undefined") {
            return array;
        }
        let direction = args[0][0];
        let column = args.replace('-','');
        array.sort((a: any, b: any) => {
            let left = Number(new Date(a[column]));
            let right = Number(new Date(b[column]));
            return (direction === "-") ?   left -right : right - left;
        });
        return array;
    }
}

@Pipe({
 name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
   }
}

@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {
    /**
     *
     * @param value
     * @returns {number}
     */
    transform(value: number): number {
        return Math.round(value);
    }

}


@Pipe({name: 'datex'})
export class DatexPipe implements PipeTransform {
   transform(value: any ,format:string): string {      
       var momentDate = moment(value);
       // If moment didn't understand the value, return it unformatted.
       if (!momentDate.isValid()) return value;
       // Otherwise, return the date formatted as requested.
       return momentDate.format(format);
   }
}
@Pipe({name: 'dateChange'})
export class DateChangePipe implements PipeTransform {
   transform(value: any ,format:string): string {      
       var momentDate = moment(value);
       // If moment didn't understand the value, return it unformatted.
       if (!momentDate.isValid()) return value;
       // Otherwise, return the date formatted as requested.
       return momentDate.format(format);
   }
}



import { DomSanitizer } from '@angular/platform-browser';
@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

}

@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

}