import {Answer} from '../models/answer.model';
import {Result} from '../models/result.model';
import { ActivatedRoute } from '@angular/router';
import {QuizService} from './quiz.service'
import {Location} from '@angular/common';

import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Question } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public resultFinal: Result ;
  private questionSelected: Question;
  private questions: Question[];
  private answers: Answer[];
  private nbAide: number = 0;
  private ptrQuestion:number=0;
  public timer: number = 0;

  public resultFinal$: Subject<Result> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();

  private lien = "http://localhost:9428/api/"

  constructor(private _location: Location,private route: ActivatedRoute,private http: HttpClient, private quizService:QuizService, private userService: UserService) {
    this.resultFinal = new Object() as Result;
    this.answers = [];
    quizService.quizSelected$.subscribe((quiz)=>{
      this.questions = quiz.questions
      this.questionSelected = this.questions[this.ptrQuestion];
      this.questionSelected$.next(this.questionSelected);
    })
    setInterval(()=> {this.timer+=1}, 1000)
    
  }

  setSelectedAnswer(questionId: string,answerId: string) {
    const urlWithId = this.lien + "themes/"+ this.quizService.quizSelected.themeId.toString() + '/quizzes/' +this.quizService.quizSelected.id.toString() + '/questions/' + questionId.toString() + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.VerifyAnswer(answer)
    });
  }

  VerifyAnswer(answer: Answer){
    if(answer.isCorrect){

      var p = document.querySelector("#indice")
      if(p.textContent != "")
        p.innerHTML="";

      this.answers.push(answer)
      this.ptrQuestion+=1;
      this.questionSelected = this.quizService.quizSelected.questions[this.ptrQuestion];
      this.questionSelected$.next(this.questionSelected)
      
      if(this.ptrQuestion === this.questions.length){
        this.ptrQuestion = 0;
        this.questionSelected = this.quizService.quizSelected.questions[this.ptrQuestion];
        this.questionSelected$.next(this.questionSelected)
        console.log(this.timer)
        this.addResult(this.timer)
      }
    }else{
      this.answers.push(answer)
      for(var i in this.questionSelected.answers){
        if(answer.id.toString() === this.questionSelected.answers[i].id.toString()){
          this.questionSelected.answers.splice(this.questionSelected.answers.indexOf(this.questionSelected.answers[i]),1)
          break;
        }
      }
    }
  }

  GiveClues(){
    var p = document.querySelector("#indice")
    p.innerHTML=this.questionSelected.indice;

    var parentNode = document.querySelector("#quiz")

    parentNode.appendChild(p)

    this.nbAide+=1;
  }

  goBack(){
    this._location.back();
  }

  addResult(dureeJeu: number){
    this.resultFinal.quizId = this.questionSelected.quizId.toString()
    this.resultFinal.userId = sessionStorage.getItem("user_id");
    this.resultFinal.answers = this.answers;
    this.resultFinal.nbAide = this.nbAide;
    this.resultFinal.dureeJeu = dureeJeu;
    this.resultFinal.dateJeu = new Date().toString();
    this.http.post(this.lien +"users/"+ this.resultFinal.userId +"/result/", this.resultFinal).subscribe(()=> console.log("OUIUIUUI"));
    alert("Bravoo, aller maintenant on va boire la soupe ;)")
    this.goBack();
  }
}