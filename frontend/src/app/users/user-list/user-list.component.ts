import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {Location} from '@angular/common';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  private curStatus: string;

  constructor(private _location: Location,private route: Router, public userService: UserService) {
    this.userService.users$.subscribe((user) => this.userList = user);
  }

  ngOnInit() {
    this.curStatus = sessionStorage.getItem("status");
  }

  back_click(){
    this._location.back();
  }


  userDeleted(selected: User) {
    this.userService.deleteUser(selected);
  }
  
  userSelected(selected: User) {
    //On affiche les theme
    this.route.navigate(['/theme-list'])
  }
}
