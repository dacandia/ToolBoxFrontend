import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../user-login/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
    user:string = "Daniel";
    @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
    reason = '';
    
    close(reason: string) {
        this.reason = reason;
        this.sidenav.close();
    }
    shouldRun = true;

    constructor(private auth:AuthService, private router: Router){

    }

    logout(): void {
      let username = this.auth.usuario.userFullName;
      this.auth.logout();
      Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
      this.router.navigate(['/landing_page']);
    }

}
