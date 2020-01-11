import { Component, OnInit } from '@angular/core';
import {Landingpage} from './landingpage';
import {LandingService} from './landing.service';
import {CalificacionesProducto} from './calificacionesProducto';
import {ComentariosProducto} from './comentariosProducto';
import {ImagenesProducto} from './imagenesProducto';
import {ProductResponse} from './productresponse';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //se crea un arreglo para guardar los datos de acuerdo al POJO creado (nota.mandar a llamar deacuerdo a lo que quiera recibir)
  landing: Landingpage[];//Se obtienen los getters y setters para traerse productos   //cuando queres todo los arreglos se pone los corchetes
  calificaciones:CalificacionesProducto[];////Se obtienen los getters y setters para traerse calificaciones productos
  comentarios: ComentariosProducto[];////Se obtienen los getters y setters para traerse comentarios productos
  imagenes:ImagenesProducto[];////Se obtienen los getters y setters para traerse imagenes productos
  ProductResponses:ProductResponse[];
  //se injecta la dependencia landing service
  constructor(private productos: LandingService) { }

  ngOnInit() {
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
