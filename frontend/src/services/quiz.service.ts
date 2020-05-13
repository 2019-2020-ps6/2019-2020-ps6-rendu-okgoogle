import { Injectable } from '@angular/core';
import { BehaviorSubject , Subject, from} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Theme } from '../models/theme.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from 'rxjs/operators'  

import { Observable, of } from 'rxjs';
import { Question } from '../models/question.model';
import { Answer } from 'src/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = [];
  public quizSelected: Quiz;
  public questionSelected: Question;
  public answerSelected: Answer;
  public themeSelected: Theme;
  public currentFileUpload : ArrayBuffer;

  private lien = "http://localhost:9428/api/themes/";

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();
  public answerSelected$: Subject<Answer> = new Subject();
  public themeSelected$: Subject<Theme> = new Subject();
  public currentFileUpload$: Subject<ArrayBuffer> = new Subject();

  constructor(private http: HttpClient) {
  }

  getQuizzesByThemeId(themeid: string){
    this.http.get<Quiz[]>(this.lien + themeid + "/quizzes/").subscribe((quizzess) => {
      this.quizzes = quizzess;  
      quizzess.reverse()
      this.quizzes$.next(this.quizzes);
    });
  }

  deleteQuiz (themeid:string,quiz: Quiz) {
    const url = this.lien+themeid+"/quizzes/"+quiz.id; 
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes)
    this.http.delete(url,header).subscribe(()=> this.getQuizzesByThemeId(themeid))
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

  addQuestion(themeid:string,quizid:string,question: Question){
    console.log(question)
    this.http.post<Question>(this.lien+ themeid +"/quizzes/"+quizid+"/questions/",question).subscribe((question)=> this.setSelectedQuiz(quizid,themeid))
  }

  addASong(themeid:string,quizid:string,song:File,songName:string){
    const formData = new FormData()
    formData.append('son',song,songName)
    this.http.post<String>(this.lien+ themeid +"/quizzes/"+quizid+"/questions/fileUpload",formData).subscribe((res)=> this.setSelectedQuiz(quizid,themeid))
  }

  getSong(themeid:string,quizid:string,questionid: string){
    this.http.get(this.lien+ themeid +"/quizzes/"+quizid+"/questions/getFileUpload/"+questionid,{responseType: 'arraybuffer'}).subscribe(data => {
        console.log("OUI")
      this.currentFileUpload = data
      this.currentFileUpload$.next(this.currentFileUpload);
    })
  }

  addAnswer(themeid:string,quizid:string,questionid:string,answer: Answer){
    //le .subscribe() est TRES IMPORTANT sinon fonctionne pas
    this.http.post<Answer>(this.lien+ themeid +"/quizzes/"+quizid+"/questions/"+questionid+"/answers/",answer).subscribe((answer)=> this.setSelectedQuiz(quizid,themeid))
  }

  deleteQuestion(themeid:string,quiz: Quiz, question: Question){
    const url = this.lien + themeid + "/quizzes/" +quiz.id+"/questions/"+question.id.toString(); 
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes);
    this.http.delete(url,header).subscribe(()=> this.setSelectedQuiz(quiz.id, themeid))
    this.quizzes$.next(this.quizzes);
  }

  deleteAnswer(themeid:string,quizid:string,questionid:string,answerid:string){
    const url = this.lien + themeid + "/quizzes/" +quizid+"/questions/"+questionid +"/answers/"+answerid; 
    const header = this.prepareHeader();
    this.quizzes$.next(this.quizzes);
    this.http.delete(url,header).subscribe(()=> this.setSelectedQuiz(quizid, themeid))
  }

  editQuestion(themeid:string,quizid:string,oldQuestionId:string,question: Question){
    const url = this.lien + themeid + "/quizzes/" +quizid+"/questions/"+oldQuestionId; 
    this.quizzes$.next(this.quizzes);
    this.http.put<Question>(url, question).subscribe((question)=>{
      this.setSelectedQuiz(quizid, themeid)
    })
  }

  editQuiz(themeid:string,quizid:string,quiz: Quiz){
    const url = this.lien + themeid + "/quizzes/" +quizid; 
    this.quizzes$.next(this.quizzes);
    this.http.put<Quiz>(url, quiz).subscribe((quiz)=>{
      this.setSelectedQuiz(quizid, themeid)
    })
  }

  editAnswer(themeid:string,quizid:string,questionid:string,answerid:string,answer: Answer){
    const url = this.lien + themeid + "/quizzes/" +quizid+"/questions/"+questionid +"/answers/"+answerid; 
    // this.quizzes$.next(this.quizzes);
    this.http.put<Answer>(url, answer).subscribe((answer)=> {
      this.setSelectedQuiz(quizid, themeid)
    })
  }
}