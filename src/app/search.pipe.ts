import { Pipe, PipeTransform } from '@angular/core';

import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allproducts : Product[] ,userword :string ):Product[] {
    return allproducts.filter((onprod)=>onprod.title.toLowerCase().includes(userword.toLowerCase()))
    
  }

}
