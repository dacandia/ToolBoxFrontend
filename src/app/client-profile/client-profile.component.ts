import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user-login/auth-service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit( ) {
  }

}
