import { Injectable } from '@angular/core';
import { Product } from './product';
import { Image } from './images/image';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductCategory } from './productCategory';
import { ProductComment } from './productComment';

@Injectable()
export class ProductService{
    private urlEndPoint:string = 'http://localhost:8080/renter/products';
    private urlEndPointImg: string = 'http://localhost:8080/renter/uploads/img';
    private urlEndPointIvan: string = 'http://localhost:8080/api/products';
    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

    constructor(
        private http: HttpClient, 
        private router: Router
    ){  }

    getProducts(page:number): Observable<any> {
        return this.http.get<Product[]>(this.urlEndPoint+'/page/'+page).pipe(
            tap( (response:any) => {
                (response.content as Product[]).forEach(product => {
                    return product;
                })
                return response;
            })
        );
    }

    

    getProduct(id:number): Observable<Product>{
        console.log("Traigo el producto con el id"+id);
        return this.http.get<Product>(`${this.urlEndPoint}/${id}`).pipe(
            catchError(e => {
                this.router.navigate(['/products']);
                Swal.fire({
                    icon: 'error',
                    title: 'Error when updating the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        )
    }

    createProduct(product: Product, images: File[]): Observable<Product>{
        let formData = new FormData();
        for(let image of images){
            formData.append("images", image);
        }
        formData.append("product", JSON.stringify(product));
        return this.http.post(this.urlEndPoint, formData).pipe(
            map( (response: any) => response.product as Product),
            catchError(e => {
                if(e.status == 400){
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error when creating the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        );
    }

    updateProduct(product: Product, images: File[]): Observable<Product>{
        let formData = new FormData();
        if(typeof images != 'undefined'){
            for(let image of images){
                formData.append('images', image);
            } 
        }
        formData.append("product",JSON.stringify(product));
        return this.http.put(`${this.urlEndPoint}`, formData).pipe(
            map( (response: any) => response.product as Product),
            catchError(e => {
                if(e.status == 400){
                    return throwError(e);
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error when updating the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        );
    }

    deleteProduct(id:number): Observable<Product>{
        return this.http.delete<Product>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error when deleting the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        );
    }

    deleteImage(imageId:number): Observable<Image>{
        return this.http.delete<Image>(`${this.urlEndPointImg}/${imageId}`, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error when deleting the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        );
    }

    filteredProducts(term:string): Observable<Product[]>{
        return this.http.get<Product[]>(`${this.urlEndPoint}/filter-products/${term}`);
    }

    getAllProductByCategory(): Observable<any>{
        return this.http.get<any[]>(this.urlEndPointIvan+'/categories').pipe(
            (response) => {
                return response;
            }    
        );
    }
    
    getProductsByCategory(category): Observable<ProductCategory[]>{
        return this.http.get<ProductCategory[]>(`${this.urlEndPointIvan}/categories/${category}`).pipe(
            tap( (response:any) => {
                (response as ProductCategory[]).forEach(product => {
                    return product;
                })
                return response;
            })
        );
    }

    createProductComment(comment: ProductComment): Observable<ProductComment>{
        return this.http.post<ProductComment>(`${this.urlEndPointIvan}/comments/`,comment).pipe(
            catchError(e => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error when deleting the product',
                    text: e.error.message
                })
                return throwError(e);
            })
        );
    }

}