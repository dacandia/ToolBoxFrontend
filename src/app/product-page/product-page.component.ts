import { Component, OnInit } from '@angular/core';
import {Landingpage} from '../landing-page/landingpage';
import {ProductResponse} from '../landing-page/productresponse';
import {LandingService} from '../landing-page/landing.service';
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  private producto: ProductResponse;
  constructor(private productoService: LandingService, private router:Router,private activatedRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.productoService.getOnliOneProduct(id).subscribe(
          (productresponse)=>this.producto=productresponse
        )
      }
    })
  }

}
