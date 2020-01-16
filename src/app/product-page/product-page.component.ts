import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Landingpage} from '../landing-page/landingpage';
import {ProductResponse} from '../landing-page/productresponse';
import {LandingService} from '../landing-page/landing.service';
import {Router,ActivatedRoute} from '@angular/router'
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { ProductComment } from '../product/productComment';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  private producto: ProductResponse;
  private _cartItem: Product;
  private _cartsItems: Product[];

  constructor(private productoService: LandingService, 
    private cartProductService : ProductService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private productService: ProductService ) { }
  protected product: Product = new Product();
  protected productComment =  new ProductComment();
  currentActivatedRoute: any;
  params: any;



  ngOnInit() {
    this.cargarCliente();
  }

  addToCart():void{

    this._cartsItems = [];
    if(localStorage.getItem('cart') != null)
    {
      this._cartsItems = JSON.parse(
        localStorage.getItem('cart')
      )

      
    }
    this._cartItem = new Product();
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.cartProductService.getProduct(id).subscribe(
          (response) => {
            this._cartItem.productId = response.productId;
            this._cartItem.productName = response.productName;
            this._cartItem.productDescription = response.productDescription;
            this._cartItem.productPrice = response.productPrice;
            this._cartItem.productQuantity = response.productQuantity;
            this._cartItem.productImage = response.productImage;
            this._cartsItems.push(this._cartItem);
            localStorage.setItem(
              'cart',JSON.stringify(this._cartsItems)
            )
            Swal.fire('Added to cart',this._cartItem.productName +" added" ,'success');      
          } 
        )
         
      }
    })   
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
