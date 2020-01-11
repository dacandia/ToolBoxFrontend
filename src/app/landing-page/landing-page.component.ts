import { Component, OnInit } from '@angular/core';
import {Landingpage} from './landingpage';
import {LandingService} from './landing.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //se crea un arreglo para guardar los datos de acuerdo al POJO creado (nota.mandar a llamar deacuerdo a lo que quiera recibir)
  landing: Landingpage;//cuando queres todo los arreglos se pone los corchetes

  //se injecta la dependencia landing service
  constructor(private productos: LandingService) { }

  ngOnInit() {
    //se le assigna la dependencia de landingservice, el metodo "get productos" a nuestra dependencia
    this.productos.getProductos().subscribe(
      //se crea una funcion anonima para suscribirse a al observable
    (productresponse) => {
      this.landing = productresponse[0].products
      console.log(productresponse[0].products)
    }
    );
  }

}
