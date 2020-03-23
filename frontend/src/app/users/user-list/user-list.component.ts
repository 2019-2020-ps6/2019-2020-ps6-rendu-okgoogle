import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  private curStatus: string;

  constructor(public userService: UserService, private cookieService:CookieService) {
    this.userService.users$.subscribe((user) => this.userList = user);
    console.log(this.userList)
  }

  ngOnInit() {
    this.curStatus = sessionStorage.getItem("status");
  }


  userDeleted(selected: User) {
    this.userService.deleteUser(selected);
  }
  
  userSelected(selected: User) {
    //On affiche les theme
    
  }
}
