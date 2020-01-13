import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserR } from './userInfo';


@Injectable({
  providedIn: 'root'
})
export class UserGeneralServiceService {

  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  constructor(private http: HttpClient, private router: Router) //inyeccion de dependencia de los objetos
  {

  }


  
}
