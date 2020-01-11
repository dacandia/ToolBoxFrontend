import { Injectable } from '@angular/core';
import {Landingpage} from './landingpage';
import {ProductResponse} from './productresponse';
import {of,Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators';

@Injectable()
export class LandingService {
  private urlEndPoint:string='http://localhost:8080/api/productos'
  //se realiza una injeccion de dependencias de la clase HttpClient
  constructor(private http: HttpClient) { }

 //Es de tipo observable para que sea una comunicacion asincrona,cada que se realiza un cambio el observable lo detecta
 //funcion que retorna la lista de productos del archivo JSON creado
  getProductos(): Observable<any>{
    //se retorna el endpoint del proyecto de spring
    return this.http.get(this.urlEndPoint).pipe(
      //se realiza el mapeo para convertir la respuesta de SPRING a un objeto obeservable tipo Landingpage[]
      map((response:any) => response.productos as ProductResponse[])
    );
  }
}
