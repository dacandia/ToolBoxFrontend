import { Component, OnInit } from '@angular/core';
import { UserR } from './userInfo';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
 public user: UserR;


  constructor() { }

  ngOnInit() {
  }

}
