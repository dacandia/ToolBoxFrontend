import { Component, OnInit } from '@angular/core';
import {Landingpage} from '../landing-page/landingpage';
import {ProductResponse} from '../landing-page/productresponse';
import {LandingService} from '../landing-page/landing.service';
import {Router,ActivatedRoute} from '@angular/router'
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

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
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private cartProductService : ProductService ) { }

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
          } 
        )
         
      }
    })   
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.productoService.getOnliOneProduct(id).subscribe(
          (productresponse)=>{
            this.producto = productresponse;
          }
        )
      }
    })
  }

}
