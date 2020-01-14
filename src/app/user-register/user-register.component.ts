import { Component, OnInit } from '@angular/core';
import { UserGeneral } from './userInfo';
import { UserGeneralServiceService } from './user-general-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
 public user: UserGeneral;
 errores: string[];


  constructor(
    private userService : UserGeneralServiceService,
    private router : Router
  ) { 
    this.user = new UserGeneral();
   }

  ngOnInit() {
    
  }

  create(): void {
    console.log(this.user);
    this.user.username = this.user.useremail;

    this.userService.create(this.user)
      .subscribe(
        response => {
          this.router.navigate(['/landing_page']);
          
          Swal.fire('Nuevo usuario', `${response.userFullName} te has registrado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }


}
