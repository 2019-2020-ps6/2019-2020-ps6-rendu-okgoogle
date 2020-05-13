import {Answer} from '../models/answer.model';
import {Result} from '../models/result.model';
import { ActivatedRoute } from '@angular/router';
import {QuizService} from './quiz.service'

import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class GameService implements OnInit {

  public resultFinal = new Object() as Result ;
  private quizFinal: Quiz;
  public quizSelected: Quiz;
  private questionSelected: Question;
  private TabAnswersQuestions: Answer[][] = [];
  private nbAide: number = 0;
  public ptrQuestion:number=0;
  public timer: number = 0;
  public onPrevious: Boolean = false;

  public resultFinal$: Subject<Result> = new Subject();
  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();

  private lien = "http://localhost:9428/api/"

  constructor(private route: ActivatedRoute,private http: HttpClient, private quizService:QuizService, private userService: UserService) {
    setInterval(()=> {this.timer+=1}, 1000)
  }
  ngOnInit(): void {
  }

  setSelectedAnswer(questionId: string,answerId: string) {
    const urlWithId = this.lien + "themes/"+ this.quizSelected.themeId.toString() + '/quizzes/' +this.quizSelected.id.toString() + '/questions/' + questionId.toString() + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.VerifyAnswer(answer)
    });
  }
  setSelectedQuiz(quizid: string, themeid:string) {
    this.ptrQuestion = 0;
    const urlWithId = this.lien +"themes/" + themeid + '/quizzes/' + quizid.toString();
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected = quiz;
      this.quizSelected$.next(quiz);
      this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
      this.questionSelected$.next(this.questionSelected);
      if(this.TabAnswersQuestions.length == 0){
        for(var i = 0; i<this.quizSelected.questions.length; i++){
          this.TabAnswersQuestions.push( this.clone(this.quizSelected.questions[i].answers));
        }
      }
      this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
        this.quizFinal = quiz
        for(var i =0; i< this.quizFinal.questions.length; i++){
          this.quizFinal.questions[i].answers = [];
        }
      });
    });

  }
  VerifyAnswer(answer: Answer){
    if(answer.isCorrect){
      this.quizFinal.questions[this.ptrQuestion].answers.push(answer)
      if(this.ptrQuestion === this.quizSelected.questions.length-1){
        this.addResult(this.timer)
      }else{
        this.ptrQuestion++;
        this.questionSelected = {...this.quizSelected.questions[this.ptrQuestion]};
        this.questionSelected$.next(this.questionSelected)
      }
    }else{
      this.quizFinal.questions[this.ptrQuestion].answers.push(answer)
      for(var i in this.questionSelected.answers){
        if(answer.id.toString() === this.questionSelected.answers[i].id.toString()){
          this.questionSelected.answers.splice(this.questionSelected.answers.indexOf(this.questionSelected.answers[i]),1)
          break;
        }
      }
    }
  }

  GiveClues(){
    this.nbAide+=1;
    this.quizFinal.questions[this.ptrQuestion].aideUtilise = true;
  }

  previousQuestion(){
    this.onPrevious = true;
    if(this.ptrQuestion > 0){
      this.ptrQuestion--;
      var arrAnswer = this.clone(this.TabAnswersQuestions[this.ptrQuestion]);
      this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
      this.questionSelected.answers = arrAnswer;
      this.questionSelected$.next(this.questionSelected)
    }
  }

  addResult(dureeJeu: number){
    if(!this.userService.defaultUser){
      this.resultFinal.userId = sessionStorage.getItem("user_id");
      this.resultFinal.quiz = this.clone(this.quizFinal)
      this.resultFinal.nbAide = this.nbAide;
      this.resultFinal.dureeJeu = dureeJeu;
      this.resultFinal.dateJeu = new Date().toString();
      console.log(this.quizFinal)
  
      this.http.post(this.lien +'result/', this.resultFinal).subscribe();
    }

    dureeJeu = 0;
    this.ptrQuestion = 0;
    this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
    this.questionSelected$.next(this.questionSelected)
    this.quizFinal.questions = [];
    this.TabAnswersQuestions = [];
    this.setSelectedQuiz(this.quizFinal.id.toString(), this.quizFinal.themeId.toString());
  }


  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

}