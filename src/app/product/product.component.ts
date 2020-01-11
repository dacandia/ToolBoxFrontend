import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private productService: ProductService, 
        private activatedRoute: ActivatedRoute) { }

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
        )
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
}
