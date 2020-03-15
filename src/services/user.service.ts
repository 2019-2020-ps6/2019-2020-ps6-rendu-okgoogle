import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private users: User[] = [];


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  constructor() {

}
  

  addUser(user: User) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user: User) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.users.splice(this.users.indexOf(user), 1);
    this.users$.next(this.users);
  }

}
