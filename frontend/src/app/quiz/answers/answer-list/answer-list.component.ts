import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from '../../../../services/quiz.service';
import { Question } from '../../../../models/question.model';
//router
@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent {

  @Input()
  question:Question

  constructor(public quizService: QuizService) {
  }

  ngOnInit(){

  }

}