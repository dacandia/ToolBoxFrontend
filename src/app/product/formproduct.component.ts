import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import {Image} from './images/image';
import { ProductService } from './product.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ProductCategory } from './productCategory';

@Component({
    selector: 'app-form-product',
    templateUrl: './formproduct.component.html',
    styleUrls: ['./formproduct.component.css']
})

export class FormProductComponent implements OnInit{

    protected product: Product = new Product();
    protected productCategories: ProductCategory[];
    protected productCategory: ProductCategory;
    protected title:string = "Add Product";
    protected errors:string[];
    protected urls = new Array<string>();
    protected selectedImages: Array<Image>;
    protected images: File[];
    protected files: any[];

    constructor(
        private productService: ProductService, 
        private router: Router,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(){
        this.uploadProduct();
    }

    uploadProduct(): void{
        this.activatedRoute.params.subscribe(params => {
            let id = params['id']
            if(id){
                this.productService.getProduct(id).subscribe( (product) => {
                    this.product = product
                    console.log(product);
                })
            }
        })
    }

    createProduct(): void{
        this.productService.createProduct(this.product, this.files).subscribe(
            product =>  {
                this.router.navigate(['./products'])
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'New Product Added',
                    text: `Product ${product.productName} was successfully created`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }, err =>{
                this.errors = err.error.errors as string[];
            }
        )
    }

    updateProduct(): void {
        console.log(this.productCategory)
        this.productService.updateProduct(this.product, this.files).subscribe( 
            product => {
                this.router.navigate(['/products'])
                swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated Product',
                    text: `Product ${product.productName} was successfully updated`,
                    showConfirmButton: false,
                    timer: 1500
                })
            },err =>{
                this.errors = err.error.errors as string[];
            }
        )
    }

    detectFiles(event) {
        this.files = event.target.files;
        if (this.files) {
            for (let file of this.files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.urls.push(e.target.result);
                }
                reader.readAsDataURL(file);
            }
            console.log(this.urls);
        };
    }

    deleteImg(imageId){
        this.productService.deleteImage(imageId).subscribe();
    }

    selectCategories(){
        this.productService.getAllProductByCategory().subscribe(
            (productCategories) => {
                this.productCategories = productCategories
            }
        ) 
    }
}