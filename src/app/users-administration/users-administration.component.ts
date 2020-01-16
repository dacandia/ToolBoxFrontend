import { Component, OnInit } from '@angular/core';
import { UserGeneral } from '../user-register/userInfo';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.css']
})
export class UsersAdministrationComponent implements OnInit {

  private urlEndPoint:string = 'http://localhost:8080/userss/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  private page :number;
  ngOnInit(){

  }
  constructor(
      private http: HttpClient, 
      private router: Router
  ){  }

  getProducts(page:number): Observable<any> {
      return this.http.get<UserGeneral[]>(this.urlEndPoint+'/page/'+page).pipe(
          tap( (response:any) => {
              (response.content as UserGeneral[]).forEach(product => {
                  return product;
              })
              return response;
          })
      );
  }

  


}
