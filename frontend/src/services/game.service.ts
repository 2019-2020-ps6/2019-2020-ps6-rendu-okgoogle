import {Answer} from '../models/answer.model';
import {Result} from '../models/result.model';

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import * as _ from "lodash"

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Result final which that it will be sent to the server
  public resultFinal = new Object() as Result ;

  // Quiz object which that it will be insert in resultFinal object to the server
  private quizForResultGame = new Object() as Quiz;

  public quizSelected: Quiz;

  private questionSelected: Question;

  private numberOfHelpUsed: number = 0;

  public ptrQuestion:number=0;

  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();

  private lien = "http://localhost:9428/api/"

  constructor(private http: HttpClient,private userService: UserService) {

  }

  setSelectedAnswer(answer:Answer) {
    this.VerifyAnswer(answer)
  }

  setSelectedQuiz(quizid: string, themeid:string) {
    this.ptrQuestion = 0;
    const urlWithId = this.lien +"themes/" + themeid + '/quizzes/' + quizid.toString();
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected = quiz;
      this.quizSelected$.next(quiz);
      this.questionSelected = _.cloneDeep(this.quizSelected.questions[this.ptrQuestion]);
      this.questionSelected$.next(this.questionSelected);
      
      this.quizForResultGame = _.cloneDeep(quiz)
      for(var i =0; i< this.quizForResultGame.questions.length; i++){
        this.quizForResultGame.questions[i].answers = [];
      }
      
    });

  }
  /**
   * Do the process for verify answer and it will add the result if the quiz is finished or change the questions if not
   * @param answer 
   */
  VerifyAnswer(answer: Answer){
    if(answer.isCorrect){
      // add the good response to quizForResult for stat
      this.quizForResultGame.questions[this.ptrQuestion].answers.push(answer)
      // when we have finished the quiz
      if(this.ptrQuestion === this.quizSelected.questions.length-1){
        this.addResult()
      }
      // when the quiz in not finished
      else{
        this.ptrQuestion++;
        this.questionSelected = {...this.quizSelected.questions[this.ptrQuestion]};
        this.questionSelected$.next(this.questionSelected)
      }
    }else{
      // add the bad answer to quizForResult for stat
      this.quizForResultGame.questions[this.ptrQuestion].answers.push(answer)
      for(var i in this.questionSelected.answers){
        if(answer.id.toString() === this.questionSelected.answers[i].id.toString()){
          // remove the bad answer in the array for user
          this.questionSelected.answers.splice(this.questionSelected.answers.indexOf(this.questionSelected.answers[i]),1)
          break;
        }
      }
    }
  }

  /**
   * Give clues for user and increment numberOfHelpUsed
   */
  GiveClues(){
    this.numberOfHelpUsed+=1;
    this.quizForResultGame.questions[this.ptrQuestion].aideUtilise = true;
  }

  /**
   * Go to the previous questions
   */
  previousQuestion(){
    if(this.ptrQuestion > 0){
      this.ptrQuestion--;
      this.questionSelected = _.cloneDeep(this.quizSelected.questions[this.ptrQuestion]);
      this.questionSelected$.next(this.questionSelected)
    }
  }

  /**
   * Push the result to the server
   */
  addResult(){
    if(!this.userService.defaultUser){
      this.resultFinal.userId = sessionStorage.getItem("user_id");
      this.resultFinal.quiz = _.cloneDeep(this.quizForResultGame)
      this.resultFinal.nbAide = this.numberOfHelpUsed;
      this.resultFinal.dateJeu = new Date().toString();  
      this.http.post(this.lien +'result/', this.resultFinal).subscribe();
    }

    this.ptrQuestion = 0;
    this.questionSelected = this.quizSelected.questions[this.ptrQuestion];
    this.questionSelected$.next(this.questionSelected)
    this.quizForResultGame.questions = [];
    this.setSelectedQuiz(this.quizForResultGame.id.toString(), this.quizForResultGame.themeId.toString());
  }

}