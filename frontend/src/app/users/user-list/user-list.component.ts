import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((user) => this.userList = user);
    console.log(this.userList)
  }

  ngOnInit() {
  }


  userDeleted(selected: User) {
    this.userService.deleteUser(selected);
  }
}
