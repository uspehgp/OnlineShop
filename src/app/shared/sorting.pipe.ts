import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "./interfaces";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], productType = ''): any {
    return products.filter(product => {
        return product.type === productType
      }
    )
  }
}
