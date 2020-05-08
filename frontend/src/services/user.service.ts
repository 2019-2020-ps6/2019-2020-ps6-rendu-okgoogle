import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];
  public userSelected: User;
  public defaultUser = false;

  private lien = "http://localhost:9428/api/users/";

  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public userSelected$: Subject<User> = new Subject();

  constructor(private http: HttpClient) {

  }
  
  setSelectedUser(idUser: string) {
    if(idUser === "default")
      this.defaultUser = true;
    else{
      const urlWithId = this.lien + idUser.toString();
      this.http.get<User>(urlWithId).subscribe((user) => {
        this.userSelected = user;
        this.userSelected$.next(user);
      });
    }
  }

  getUsers() : void {
    this.http.get<User[]>(this.lien).subscribe((userss) =>{
      this.users=userss;
      this.users.reverse()
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
    const url = this.lien +userid; 
    this.users$.next(this.users);
    this.http.put<User>(url, user).subscribe(()=> this.getUsers())
    this.users$.next(this.users)
  }

}
