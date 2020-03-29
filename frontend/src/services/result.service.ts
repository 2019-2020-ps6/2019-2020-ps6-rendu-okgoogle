import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {Question} from '../models/question.model';
import {Answer} from '../models/answer.model';
import {ResultQuestion} from '../models/result.model';
import {FinalResult} from '../models/result.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private resultFinal: FinalResult;
  private answer: Answer;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public result$: BehaviorSubject<FinalResult> = new BehaviorSubject(this.resultFinal);
  public correctAnswer$: BehaviorSubject<Answer> = new BehaviorSubject(this.answer);

  public resultSelected$: Subject<FinalResult> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public correctAnswerSelected$: Subject<Answer> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();

  private lien = "http://localhost:9428/api/themes/"

  constructor(private route: ActivatedRoute,private http: HttpClient) {
    this.setResultFromUrl();
  }

  setResultFromUrl() {
    this.http.get<FinalResult>(this.lien).subscribe((result) => {
      this.resultFinal = result;
      this.result$.next(this.resultFinal);
    });
  }

  setSelectedResult(resultId: string) {
    const themeid = +this.route.snapshot.paramMap.get("themeid");
    const urlWithId = this.lien + themeid +"/quizzes/"+ resultId;
    this.http.get<FinalResult>(urlWithId).subscribe((result) => {
      this.resultSelected$.next(this.resultFinal);
    });
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.lien + quizId + '/questions/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  setSelectedAnswer(quizId: string, questionId: string, answerId: string) {
    const urlWithId = this.lien + quizId + '/questions/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected$.next(answer);
    });
  }

  setSelectedCorrectAnswer(quizId: string, questionId: string, answerId: string) {
    const urlWithId = this.lien + quizId + '/questions/' + questionId + '/answers/' + answerId;
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.correctAnswerSelected$.next(answer);
    });
  }

  addResult(result: FinalResult){
    this.http.post(this.lien +"/result", result).subscribe();
  }
}
