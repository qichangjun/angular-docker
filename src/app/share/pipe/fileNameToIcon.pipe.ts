import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNameToIcon'
})
export class fileNameToIconfilter implements PipeTransform {
  transform(fileName : string): string{
    if(!fileName){
      return 
    }
    let arr = fileName.split('.')
    return arr[arr.length - 1]    
  }
}
