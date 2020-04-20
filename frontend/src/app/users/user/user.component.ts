import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private curStatus: string;

  @Input()
  user: User;

  @Output()
  userDeleted: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();  
  
  @Output()
  userEdited: EventEmitter<User> = new EventEmitter<User>();
    
  @Output()
  userStatistic: EventEmitter<User> = new EventEmitter<User>();

  constructor() {

  }

  ngOnInit() {  
    this.curStatus = sessionStorage.getItem('status');
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
  
  statistic(user: User){
    this.userStatistic.emit(user);
  }
}
