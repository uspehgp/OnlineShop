import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {FbResponse} from "./interfaces";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient
  ) {
  }

  create(product) {
    return this.http.post(`${environment.fbDbUrl}/product.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }
}
