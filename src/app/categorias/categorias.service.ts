import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Product } from '../product/product';
import { Category } from '../categorias/category';


@Injectable()
export class CategoriesService{
    private urlEndPointCategories:string = 'http://localhost:8080/api/products/categories';

    constructor(private http: HttpClient){  }

    getProductByCategory(categories:String): Observable<any>{
        return this.http.get<Category[]>(`${this.urlEndPointCategories}/${categories}`).pipe(
          //map((response:any) => response.productCategoryById as Category[])
          tap( (response:any) => {
              (response.content as Category[]).forEach(product => {
                  return product;
              })
              return response;
          })

        )
    }

    getAllProductByCategory(): Observable<any>{
      return this.http.get(this.urlEndPointCategories).pipe(
        map((response:any) => response.productCategory as Category[])
        /*
        tap( (response:any) => {
            (response.content as Category[]).forEach(product => {
                return product;
            })
            return response;
        })
        */
      )
    }

}
