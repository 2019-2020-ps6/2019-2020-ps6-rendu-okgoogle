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
  

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  /** DELETE: delete the hero from the server */
  deleteQuiz (quiz: Quiz): Observable<{}> {
    const url = "http://localhost:9428/api/quizzes/"+quiz.id; // DELETE api/heroes/42
    const header = this.prepareHeader();
    return this.http.delete(url,header )
  }

//   deleteQuiz(quiz: Quiz): Observable<void> {
//     console.log(quiz)
//     return this.http.delete<void>()
// }

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

      for(var i in quizzess)
        this.quizzes.push(quizzess[i]);
      
      this.quizzes$.next(this.quizzes);
    });
  }

  //je recupere la liste de question d'un quiz avec l'id passer en parametre
  setQuestionsFromUrl(quizId: string){
    this.http.get<{questions: Question[]}>(this.lien+ quizId +"/questions").subscribe((questionss: {questions: Question[]}) => {

      for(var i in questionss){
        if(questionss[i].quizId.toString() === quizId){
          this.questions.push(questionss[i]);
        }
      }
    
      this.questions$.next(this.questions);
    });
  }

  getQuiz(id: string): Observable<Quiz> {
    return of(this.quizzes.filter((quiz) => quiz.id.toString() === id)[0]);
  }

  getQuestions(id: string): Observable<Question[]> {
    this.setQuestionsFromUrl(id);
    return of(this.questions)
  }

  // getQuestions(id: string): Observable<Question[]> {
  //   return of(this.quizzes.filter((quiz) =>{
  //     if(quiz.id.toString() === id){
  //       return quiz.questions
  //     }
  //   }));
  // }

  addQuestion(quiz: Quiz,question: Question){
    console.log(quiz)
    console.log(question)
    //le .subscribe() est TRES IMPORTANT sinon fonctionne pas
    this.http.post(this.lien+quiz.id.toString()+"/questions/",question).subscribe()
    quiz.questions.push(question);
    this.quizzes$.next(this.quizzes);
  }

}
