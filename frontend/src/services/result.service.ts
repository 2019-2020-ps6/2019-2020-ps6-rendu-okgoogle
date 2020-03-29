import {Answer} from '../models/answer.model';
import {FinalResult} from '../models/result.model';
import { ActivatedRoute } from '@angular/router';

import {BehaviorSubject, Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private resultFinal: FinalResult;
  private answers: Answer[];
  private currentGoodAnswer: Answer;
  private answerSelected: Answer;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public result$: BehaviorSubject<FinalResult> = new BehaviorSubject(this.resultFinal);
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject(this.answers);

  //Pour la recup de result
  public answerSelected$: Subject<Answer> = new Subject();
  public currentGoodAnswer$:Subject<Answer> = new Subject();

  private lien = "http://localhost:9428/api/themes/"

  constructor(private route: ActivatedRoute,private http: HttpClient) {
    
  }

  addResult(result: FinalResult){
    this.http.post(this.lien +"/result", result).subscribe();
  }
}