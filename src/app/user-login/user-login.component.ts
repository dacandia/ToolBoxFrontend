import { Component, OnInit } from '@angular/core';
import { UserGeneral } from '../user-register/userInfo';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: UserGeneral;
  constructor(private authService: AuthService, private router:Router) {
    this.user = new UserGeneral();
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.userFullName} ya estás autenticado!`, 'info');
      this.router.navigate(['/landing_page']);
    }
  }

  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.userpassword == null) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/landing_page']);
      Swal.fire('Login', `Hola ${usuario.userFullName}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }
}
