import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private curStatus: string;
  public confirmationDeleteUser: boolean = false;
  public userToDelete: User;

  @Input()
  user: User;

  @Output()
  userDeleted: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();

  @Output()
  EditUser: EventEmitter<User> = new EventEmitter<User>();

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

  editUser(user: User) {
    this.EditUser.emit(user);
  }

  deleteUser(user: User) {
    this.userDeleted.emit(user);
  }

  statistic(user: User) {
    this.userStatistic.emit(user);
  }

  supprUserConfirmation(user: User) {
    this.confirmationDeleteUser = true;
    this.userToDelete = user;
  }

  supprUserConf(decision: boolean) {
    if (decision)
      this.userDeleted.emit(this.user);
    else
      this.confirmationDeleteUser = false;
  }

  supprUserC(user: User, confirmationDelete: boolean){
    if(confirmationDelete){
      this.deleteUser(user);
      this.confirmationDeleteUser = false;
    }else{
      this.confirmationDeleteUser = false;
    }
  }



  // supprAnswerC(answer: Answer, confirmationDelete: boolean) {
  //   if (confirmationDelete) {
  //     const themeid = this.route.snapshot.paramMap.get('themeid');
  //     const quizid = this.route.snapshot.paramMap.get('quizid');
  //     this.quizService.deleteAnswer(themeid, quizid, this.question.id.toString(), answer.id);
  //     this.confirmationDeleteAnswer = false;
  //   }
  //   else {
  //     this.confirmationDeleteAnswer = false;
  //   }
  // }
  // supprAnswerConfirmation(answer: Answer) {
  //   this.confirmationDeleteAnswer = true;
  //   this.answerToDelete = answer;
  // }
}
