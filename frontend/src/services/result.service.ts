import {Answer} from '../models/answer.model';
import {Result} from '../models/result.model';
import { ActivatedRoute } from '@angular/router';
import {QuizService} from './quiz.service'

import {BehaviorSubject, Subject, from} from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService implements OnInit{

  private resultFinal: Result;
  private answers: Answer[];
  private currentGoodAnswer: Answer;
  private quizSelected: Quiz;
  private nbEssai: Number = 0;


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public result$: BehaviorSubject<Result> = new BehaviorSubject(this.resultFinal);
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject(this.answers);
  public nbEssai$: BehaviorSubject<Number>= new BehaviorSubject(this.nbEssai);

  //Pour la recup de result
  public quizSelected$: Subject<Quiz> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public currentGoodAnswer$:Subject<Answer> = new Subject();

  private lien = "http://localhost:9428/api/"

  constructor(private route: ActivatedRoute,private http: HttpClient, private quizService:QuizService, private userService: UserService) {
    
    this.nbEssai$.subscribe((nbEssai) => this.nbEssai = nbEssai);
    this.result$.subscribe((res) => this.resultFinal = res);
    this.answers$.subscribe((answer) => this.answers = answer)



  }

  ngOnInit(){
        //Set resultFinal
        this.resultFinal.quizId = this.quizService.themeSelected.id.toString();
        this.resultFinal.userId = this.userService.userSelected.id.toString();
  }

  setSelectedAnswer(quizId: string, questionId: string, answerId: string) {
    if(this.nbEssai == 2){
      const urlWithId = this.lien + "themes/"+ this.quizSelected.themeId.toString() + '/quizzes/' + this.quizSelected.id.toString() + '/questions/' + questionId + '/answers/' + answerId;
      this.http.get<Answer>(urlWithId).subscribe((answer) => {
        this.resultFinal.answers.push(answer)
      });
    }
  }

  getAnswerOfQuestion(questionId: string){
    const urlWithId = this.lien + "themes/"+ this.quizSelected.themeId.toString() + '/quizzes/' + this.quizSelected.id.toString() + '/questions/' + questionId;
    this.http.get<Answer[]>(urlWithId).subscribe((answer) => {
      this.answers = answer
    });
  }

  addResult(dureeJeu: number){
    this.resultFinal.dureeJeu = dureeJeu;
    this.resultFinal.dateJeu = new Date().toString();
    this.http.post(this.lien +"users"+ this.userService.userSelected.id.toString() +"/result/", this.resultFinal).subscribe();
  }
}