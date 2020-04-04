import {Location} from '@angular/common';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from 'src/models/quiz.model';
import { User } from 'src/models/user.model';
import { Result } from 'src/models/result.model';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})

export class StatService implements OnInit {

  private quizSelected: Quiz;
  private userSelected: User;
  private resultsSelected: Result[] = [];
  private quizzes: Quiz[]= [];

  public quizSelected$: Subject<Quiz> = new Subject();
  public userSelected$: Subject<User> = new Subject();
  public resultsSelected$: Subject<Result[]> = new Subject();
  public quizzes$: Subject<Quiz[]> = new Subject();

  private lien = "http://localhost:9428/api/"

  constructor(private _location: Location,private http: HttpClient, private themeService:ThemeService) {

  }
  ngOnInit(): void {

  }

  setSelectedUser(userid:string) {
    const urlWithId = this.lien + "users/" + userid
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected = user;
      this.userSelected$.next(this.userSelected);
    });
  }

  setSelectedQuiz(lequiz: string, theme:string) {
    const urlWithId = this.lien +"themes/" + theme + '/quizzes/' + lequiz.toString();
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected = quiz;
      this.quizSelected$.next(quiz);
    });
  }

  setSelectedResult(userid: string){
      const urlWithId = this.lien+'result/'+userid
      this.http.get<Result[]>(urlWithId).subscribe((res)=>{
        this.resultsSelected = res;
        this.resultsSelected$.next(this.resultsSelected);
      });
  }

  getAllQuizzes(){
    const urlWithId = this.lien + 'quizzes/'
    this.http.get<Quiz[]>(urlWithId).subscribe((quizzes)=>{
        this.quizzes = quizzes
        this.quizzes$.next(this.quizzes)
        console.log(quizzes)
    })
  }  

  goBack(){
    this._location.back();
  }

}