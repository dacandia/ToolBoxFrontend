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
}
