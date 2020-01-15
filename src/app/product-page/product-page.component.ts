import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Landingpage} from '../landing-page/landingpage';
import {ProductResponse} from '../landing-page/productresponse';
import {LandingService} from '../landing-page/landing.service';
import {Router,ActivatedRoute} from '@angular/router'
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { ProductComment } from '../product/productComment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnChanges {

  private producto: ProductResponse;
  protected product: Product = new Product();
  protected productComment =  new ProductComment();
  currentActivatedRoute: any;
  params: any;

  constructor(
      private productoService: LandingService, 
      private router:Router,
      private activatedRoute:ActivatedRoute,
      private productService: ProductService ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.productService.getProduct(id).subscribe( (product) => this.product = product
        )
      }
    })
  }

  sendComment(): void{
    this.productComment.product = this.product;
    this.productService.createProductComment(this.productComment).subscribe(
      productComment =>  {
        this.cargarCliente();
        this.productComment  = new ProductComment();
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New Comment Added',
            text: `Comment was successfully created`,
            showConfirmButton: false,
            timer: 1500
        })
      }
    )
  }

}
