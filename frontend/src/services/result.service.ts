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
export class ResultService implements OnInit {

  public resultFinal = new Object() as Result ;
  private quizSelected: Quiz;
  private questionSelected: Question;
  private answersRes: Answer[] = [];
  private questionsRes: Question[] = [];
  private TabAnswersQuestions: Answer[][] = [];
  private nbAide: number = 0;
  private ptrQuestion:number=0;
  public timer: number = 0;

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
  setSelectedQuiz(lequiz: string, theme:string) {
    const urlWithId = this.lien +"themes/" + theme + '/quizzes/' + lequiz.toString();
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      console.log("Le selected"+quiz.name);
      this.quizSelected = quiz;
      this.quizSelected$.next(quiz);
      this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
      this.questionSelected$.next(this.questionSelected);
      if(this.TabAnswersQuestions.length == 0){
        for(var i = 0; i<this.quizSelected.questions.length; i++){
          this.TabAnswersQuestions.push(this.quizSelected.questions[i].answers);
        }
        console.log(this.TabAnswersQuestions)
      }

    });
  }
  VerifyAnswer(answer: Answer){
    if(answer.isCorrect){      
      this.questionsRes.push(this.questionSelected)
      this.answersRes.push(answer)

      this.ptrQuestion+=1;        

      this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
      this.questionSelected$.next(this.questionSelected)
      
      if(this.ptrQuestion === this.quizSelected.questions.length){
        this.ptrQuestion = 0;
        this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
        this.questionSelected$.next(this.questionSelected)
        console.log(this.timer)
        this.addResult(this.timer)
      }
    }else{
      this.answersRes.push(answer)
      this.questionsRes.push(this.questionSelected)
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
    this.questionsRes[this.ptrQuestion].aideUtilise = true;
  }

  previousQuestion(){
    if(this.ptrQuestion > 0){
      this.ptrQuestion--;
      var arrAnswer = [...this.TabAnswersQuestions[this.ptrQuestion]];
      this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
      this.questionSelected.answers = arrAnswer;
      this.questionSelected$.next(this.questionSelected)
    }
  }


  addResult(dureeJeu: number){
    this.resultFinal.nameQuiz = this.quizSelected.name;
    this.resultFinal.dateQuiz = this.quizSelected.creationDate.toString()
    this.resultFinal.quizId = this.questionSelected.quizId.toString()
    this.resultFinal.userId = sessionStorage.getItem("user_id");
    this.resultFinal.answers = this.answersRes;
    this.resultFinal.questions = this.questionsRes;
    this.resultFinal.nbAide = this.nbAide;
    this.resultFinal.dureeJeu = dureeJeu;
    this.resultFinal.dateJeu = new Date().toString();
    this.http.post(this.lien +'result/', this.resultFinal).subscribe();
    dureeJeu = 0;
    this.questionsRes = [];
    this.answersRes = [];
    this.TabAnswersQuestions = [];
  }
}