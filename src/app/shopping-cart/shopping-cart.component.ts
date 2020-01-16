import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { AuthService } from '../user-login/auth-service';
import { ShoppingInfo } from './shoppingInfoConfirmed';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private cartItems : Product[];
  cartPrices: number[];
  totals: number;
  shopping: ShoppingInfo;

  constructor(private auth: AuthService, private http : HttpClient, private router: Router) {
    this.cartPrices = [];
   }

   

  ngOnInit() {   
    this.getItems()
    this.fill();
    this.multiply();
  }

  multiply():void
  {
    this.totals = 0;
    for(var i = 0; i < this.cartItems.length; i++)
    {
      this.totals += this.cartPrices[i] * this.cartItems[i].productPrice;
    }

  }

  fill():void
  {
 
    for(var i = 0; i < this.cartItems.length; i++)
    {
      this.cartPrices[i] = 1;
    }
  }

  check():void{
    this.shopping = new ShoppingInfo();
    this.shopping.cartItems = this.cartItems;
    this.shopping.cartPrices = this.cartPrices;
    this.shopping.totals =  this.totals;
    this.shopping.userIdentifier = this.auth.usuario.username;
    this.http.post("http://localhost:8080/shoppingCartCheck", this.shopping).subscribe(
    (response) => console.log(response)
   );
   localStorage.removeItem('cart');

     Swal.fire('Your payment has been acepted!', 'Now you can continue shopping','success');
      this.router.navigate(['/landing_page']);
   
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

  deleteItem(product:Product, i :number):void{
    this.cartItems.splice(this.cartItems.indexOf(product,1)) //remove the index
    this.cartPrices[i] = 0;


    localStorage.removeItem('cart');
    localStorage.setItem('cart',JSON.stringify(this.cartItems));  
    this.multiply();
  }

}
