import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  private cookieValue : string;

  constructor(public userService: UserService) {

  }

  ngOnInit() {
  }

  setAdminUser(): void{
    sessionStorage.setItem("status", "admin");
  }
  setStdUser(): void{
    sessionStorage.setItem("status", "user");
  }

}
