import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith, map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from '../user-login/auth-service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    products: Product[];
    paginator: any;
    url: string;

    autocompleteControl = new FormControl();
    filteredProducts: Observable<Product[]>;

    constructor(
        private productService: ProductService, 
        private activatedRoute: ActivatedRoute, 
        private router: Router,
        private auth: AuthService
    ) {
      this.url = "/products/page/";
      console.log(auth.usuario.userId);
     }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
          params =>{
            let page:number = +params.get('page');
            if(!page){
              page = 0;
            }
            this.productService.getProducts(page).subscribe(
              response => {
                this.products = response.content as Product[];
                this.paginator = response;
              }
            );
          }
        );

        this.filteredProducts = this.autocompleteControl.valueChanges
            .pipe(
                map( value => typeof value === 'string' ? value : value.productName),
                flatMap( value => value ? this._filter(value) : [])
            );
    }

    delete(product: Product): void{
        this.swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.productService.deleteProduct(product.productId).subscribe(response => {
                  this.products = this.products.filter(pro => pro != product)
                  
                  this.swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                  )
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
              this.swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your product is safe :)',
                'error'
              )
            }
        }) 
    }

    //To make the search beetwen components
    private _filter(value: string): Observable<Product[]>{
        const filterValue = value.toLowerCase();
        return this.productService.filteredProducts(filterValue);
    }

    showProductName(product ? : Product): string | undefined{
      return product ? product.productName : undefined;
    }

    selectProduct(event: MatAutocompleteSelectedEvent):void{
      let product = event.option.value as Product;
      console.log(product);
      this.autocompleteControl.setValue('');
      event.option.focus();
      event.option.deselect();
      this.router.navigate(['/products/form/'+product.productId]);
    }
}
