import { Component, OnInit  } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {


  constructor(private route:Router, public userService: UserService) {

  }

  ngOnInit() {
  }

  setAdminUser(): void{
    sessionStorage.setItem("status", "admin");
    this.route.navigate(['main-admin'])
  }
  
  setStdUser(): void{
    sessionStorage.setItem("status", "user");
    this.route.navigate(['user-list'])
  }



}
