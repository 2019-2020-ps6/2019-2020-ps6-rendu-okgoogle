import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] = [];
  private questions: Question[] = [];

  private lien = "http://localhost:9428/api/quizzes/";

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }
  

  /** DELETE: delete the quiz from the server */
  deleteQuiz (quiz: Quiz): Observable<{}> {
    const url = "http://localhost:9428/api/quizzes/"+quiz.id; // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes)
    return this.http.delete(url,header)
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

  setQuizzesFromUrl(){
    this.http.get<{quizzes: Quiz[]}>(this.lien).subscribe((quizzess: {quizzes: Quiz[]}) => {
      this.quizzes = []
      for(var i in quizzess)
        this.quizzes.push(quizzess[i]);
      
      this.quizzes$.next(this.quizzes);
    });
  }

  getQuiz(id: string): Observable<Quiz> {
    return of(this.quizzes.filter((quiz) => quiz.id.toString() === id)[0]);
  }

  addQuiz(quiz: Quiz): void {
    this.http.post(this.lien,quiz).subscribe()
    this.setQuizzesFromUrl()
  }

  getQuestions(id: string): Observable<Question[]> {
    this.questions = []

    this.http.get<{questions: Question[]}>(this.lien+ id +"/questions").subscribe((questionss: {questions: Question[]}) => {
      for(var i in questionss){
        if(questionss[i].quizId.toString() === id){
          this.questions.push(questionss[i]);
        }
      }
    });
    return of(this.questions);
  }

  addQuestion(quiz: Quiz,question: Question){
    //le .subscribe() est TRES IMPORTANT sinon fonctionne pas
    this.http.post<Question>(this.lien+quiz.id.toString()+"/questions/",question).subscribe((question)=> this.questions.push(question))
    this.questions$.next(this.questions)
  }


  deleteQuestion(idQuiz:string,idQuestion: string) : Observable<{}>{
    const url = "http://localhost:9428/api/quizzes/"+idQuiz.toString()+"/questions/"+idQuestion.toString(); // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.questions$.next(this.questions)
    return this.http.delete(url,header)
  }
}
