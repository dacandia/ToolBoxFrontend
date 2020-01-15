import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private cartItems : Product[];
  cartPrices: Number[];

  constructor() {
    this.cartPrices = [];
   }

   

  ngOnInit() {   
    this.getItems()
  }

  multiply(id:number, value:number)
  {

  }

  getItems():void{
    this.cartItems = [];
    

    if(localStorage.getItem('cart') != null)
    {
      this.cartItems = JSON.parse(
        localStorage.getItem('cart')
      )      
    }

  }

  deleteItem(product:Product):void{
    this.cartItems.splice(this.cartItems.indexOf(product,1)) //remove the index
    localStorage.removeItem('cart');
    localStorage.setItem('cart',JSON.stringify(this.cartItems));  
    
  }

}
