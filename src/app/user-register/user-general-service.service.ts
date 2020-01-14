import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserGeneral } from './userInfo';
import {Observable,throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserGeneralServiceService {

  private urlEndPoint: string = "http://localhost:8080/users-login/userregister";
  constructor(private http: HttpClient, private router: Router) //inyeccion de dependencia de los objetos
  {

  }

  create(user: UserGeneral): Observable<UserGeneral> {
    return this.http.post(this.urlEndPoint, user )
      .pipe(
        map((response: any) => response.User as UserGeneral),
        catchError(e => {
        
          if(e.status != 401 && e.error.mensaje){
            this.router.navigate(['/landing_page']);
            console.error(e.error.mensaje);
          }
          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          
          Swal.fire(e.error.Mensaje, "Probably your email is already in use or try it again later", 'error');
          return throwError(e);
        })
      );
  }

  
}
