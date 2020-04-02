import { Injectable } from '@angular/core';
import { BehaviorSubject , Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Theme } from '../models/theme.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of,Observer } from 'rxjs';
import { Question } from '../models/question.model';
import { ThemeService } from './theme.service';
import { Answer } from 'src/models/answer.model';

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
  public quizSelected: Quiz;
  public questionSelected: Question;
  public answerSelected: Answer;
  public themeSelected: Theme;
  private questions: Question[] = [];

  private lien = "http://localhost:9428/api/themes/";

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public themeSelected$: Subject<Theme> = new Subject();

  constructor(private http: HttpClient, private themeService : ThemeService) {
  }

  ngOnInit(){

  }

  getQuizzesByThemeId(themeid: string){
    this.http.get<Quiz[]>(this.lien + themeid + "/quizzes/").subscribe((quizzess) => {
      this.quizzes = quizzess;  
      this.quizzes$.next(this.quizzes);
    });
  }

  // setQuizzesFromUrl(){
  //   console.log("Un id"+this.themeSelected.id)
  //   this.http.get<Quiz[]>(this.lien + this.themeSelected.id + "/quizzes/").subscribe((quizzess) => {
  //     this.quizzes = quizzess;
  //     console.log(quizzess)
  //     this.quizzes$.next(this.quizzes);
  //   });
  // }

  // setQuizzesFromUrlWithIdTheme(themeid: string){
  //   this.http.get<Quiz[]>(this.lien + themeid + "/quizzes/").subscribe((quizzess) => {
  //     this.quizzes = quizzess;
  //     console.log(quizzess)
  //     this.quizzes$.next(this.quizzes);
  //   });
  // }

  /** DELETE: delete the quiz from the server */
  deleteQuiz (themeid:string,quiz: Quiz): Observable<{}> {
    const url = this.lien+themeid+"/quizzes/"+quiz.id; // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes)
    return this.http.delete(url,header)
  }

  /** Header for deleting: allow deleting from the server */
  protected prepareHeader(): object {
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
      });

    return {
        headers: headers
    };
  }

  setSelectedQuiz(lequiz: string, theme:string) {
    const urlWithId = this.lien + theme + '/quizzes/' + lequiz.toString();
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected = quiz;
      this.quizSelected$.next(quiz);
    });
  }

  setSelectedQuestion(themeid:string,quizid: string, questionid: string) {
    const urlWithId = this.lien + themeid.toString() + '/quizzes/' +quizid.toString() + "/questions/"+ questionid.toString();
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected = question;
      this.questionSelected$.next(question);
    });
  }

  setSelectedAnswer(lareponse: string) {
    const urlWithId = this.lien + this.themeSelected.id.toString() + '/quizzes/' +this.quizSelected.id.toString() + "/questions/"+ this.quizSelected.id.toString()+"/answers/"+lareponse.toString();
    this.http.get<Answer>(urlWithId).subscribe((answer) => {
      this.answerSelected = answer;
      this.answerSelected$.next(answer);
    });
  }

  getQuizById(id: string): Observable<Quiz> {
    return of(this.quizzes.filter((quiz) => quiz.id.toString() === id)[0]);
  }

  addQuiz(id: string,quiz: Quiz): void {
    this.http.post(this.lien+id.toString()+"/quizzes/",quiz).subscribe((quiz) => this.getQuizzesByThemeId(id))
  }

  addQuestion(question: Question){
    console.log(question)
    //le .subscribe() est TRES IMPORTANT sinon fonctionne pas
    this.http.post<Question>(this.lien+ this.themeService.themeSelected.id +"/quizzes/"+this.quizSelected.id+"/questions/",question).subscribe((question)=> this.quizSelected.questions.push(question))
    this.questions$.next(this.questions);
  }

  addAnswer(answer: Answer){
    //le .subscribe() est TRES IMPORTANT sinon fonctionne pas
    this.http.post<Answer>(this.lien+ this.themeService.themeSelected.id +"/quizzes/"+this.quizSelected.id+"/questions/"+this.questionSelected.id.toString()+"/answers/",answer).subscribe((answer)=> this.questionSelected.answers.push(answer))
    this.questions$.next(this.questions);
  }

  deleteQuestion(themeid:string,quiz: Quiz, question: Question){
    const url = this.lien + themeid + "/quizzes/" +quiz.id+"/questions/"+question.id.toString(); // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes);
    this.http.delete(url,header).subscribe(()=> console.log("suppr"))
    this.quizzes$.next(this.quizzes);
  }

  deleteAnswer(question: Question, answer: Answer){
    const url = this.lien + this.themeSelected.id + "/quizzes/" +this.quizSelected.id.toString()+"/questions/"+question.id.toString() +"/answers/"+answer.id.toString(); // DELETE api/heroes/42
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes);
    this.http.delete(url,header).subscribe(()=> console.log("suppr"))
    this.questions$.next(this.questions);
  }

  editQuestion(themeid:string,quizid:string,oldQuestionId:string,question: Question){
    const url = this.lien + themeid + "/quizzes/" +quizid+"/questions/"+oldQuestionId; // DELETE api/heroes/42
    this.quizzes$.next(this.quizzes);
    this.http.put<Question>(url, question).subscribe(()=> this.getQuizzesByThemeId(themeid))
    this.quizzes$.next(this.quizzes)
  }

  editAnswer(answer: Answer){
    const url = this.lien + this.themeService.themeSelected.id.toString() + "/quizzes/" +this.quizSelected.id.toString()+"/questions/"+this.questionSelected.id.toString() +"/answers/"+answer.id.toString(); // DELETE api/heroes/42
    this.quizzes$.next(this.quizzes);
    this.http.put<Answer>(url, answer).subscribe((answer)=> this.questionSelected.answers.push(answer))
    this.questions$.next(this.questions);
  }
}