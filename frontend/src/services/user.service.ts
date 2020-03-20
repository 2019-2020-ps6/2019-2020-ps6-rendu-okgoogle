import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private lien = "http://localhost:9428/api/users/";

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  constructor(private http: HttpClient) {
    this.getUser();
  }
  


  getUser() : void {
    this.http.get<{users : User[]}>(this.lien).subscribe((user : {users: User[]}) =>{
      for(var i in user){
        this.users.push(user[i])
      }
      this.users$.next(this.users);
    })
  }


  addUser(user: User){
    this.http.post(this.lien,user).subscribe()
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user: any) {
    const url = this.lien+user.id.toString();
    const header = this.prepareHeader();
    this.users.splice(this.users.indexOf(user), 1);
    this.users$.next(this.users);

    return this.http.delete(url,header).subscribe()
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }


  protected prepareHeader(): object {
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });
   
    return {
        headers: headers
    };
  }

}
