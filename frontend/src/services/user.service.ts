import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private users: User[] = [];
  public userSelected: User;

  private lien = "http://localhost:9428/api/users/";

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public userSelected$: Subject<User> = new Subject();

  constructor(private http: HttpClient) {

  }

  ngOnInit(){

  }
  
  setSelectedUser(idUser: string) {
    const urlWithId = this.lien + idUser.toString();
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected = user;
      this.userSelected$.next(user);
    });
  }

  getUsers() : void {
    this.http.get<User[]>(this.lien).subscribe((userss) =>{
      this.users=userss;
      this.users$.next(this.users);
    })
  }

  addUser(user: User){
    this.http.post(this.lien,user).subscribe(()=> this.getUsers());
  }

  deleteUser(user:User) {
    const url = this.lien+user.id.toString();
    const header = this.prepareHeader();
    this.http.delete(url,header).subscribe(()=> this.getUsers())
    this.users$.next(this.users);
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

  editUser(userid:string,user: User){
    const url = this.lien +userid; // DELETE api/heroes/42
    this.users$.next(this.users);
    this.http.put<User>(url, user).subscribe(()=> this.getUsers())
    this.users$.next(this.users)
  }

}
