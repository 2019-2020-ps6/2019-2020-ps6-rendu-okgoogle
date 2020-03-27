import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userDeleted: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();  
  
  @Output()
  userEdited: EventEmitter<User> = new EventEmitter<User>();

  constructor() {

  }

  ngOnInit() {  
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }

  editUser(user:User){
    this.userEdited.emit(user);
  }

  deleteUser(user: User) {
    this.userDeleted.emit(user);
  }
}
