import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { StatService } from 'src/services/stat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];
  private curStatus: string;

  constructor(private route: Router, public userService: UserService, private statService: StatService) {
    this.userService.getUsers()
    this.userService.users$.subscribe((user) => this.userList = user);
  }

  ngOnInit() {
    this.curStatus = sessionStorage.getItem("status");
  }

  userDeleted(selected: User) {
    this.userService.deleteUser(selected);
  }
  
  userEdited(selected: User) {
    this.route.navigate(['/edit-user/', selected.id])
  }

  userStatistic(user: User){
    this.route.navigate(['user-stat', user.id.toString()]);
  }
  
  userSelected(selected) {
    if(selected === "default"){
      this.userService.setSelectedUser(selected)
      sessionStorage.setItem("user_id", selected)
      this.route.navigate(['theme-list']);
    }else{
      this.userService.setSelectedUser(selected.id.toString())
      sessionStorage.setItem("user_id", selected.id.toString())
      this.route.navigate(['theme-list']);
    }
  }
}