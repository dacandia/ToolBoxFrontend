import { Component, OnInit } from '@angular/core';
import {LandingService} from './landing.service';
import {ProductResponse} from './productresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //se crea un arreglo para guardar los datos de acuerdo al POJO creado (nota.mandar a llamar deacuerdo a lo que quiera recibir)
  ProductResponses:ProductResponse[];
  //se injecta la dependencia landing service
  paginator:any;
  url: string;
  products: Product[];

  constructor(private productService: ProductService,private productos: LandingService,private activatedRoute: ActivatedRoute, private router: Router) { 
    this.url="/landing_page/page";
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

    //se le assigna la dependencia de landingservice, el metodo "get productos" a nuestra dependencia
    this.productos.getProductos().subscribe(
      //se crea una funcion anonima para suscribirse a al observable
    (productresponse) => {
  //  let productresponse2=productresponse.length
  this.ProductResponses = productresponse
console.log(this.ProductResponses)
    }
    );

  }

}
