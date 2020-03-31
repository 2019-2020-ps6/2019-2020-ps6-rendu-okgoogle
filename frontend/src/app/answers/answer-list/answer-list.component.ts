import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Answer } from '../../../models/answer.model';
import { Question } from '../../../models/question.model';
//router
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from 'src/models/quiz.model';
@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  @Input()
  question:Question

  constructor(private router:Router, public quizService: QuizService) {
  }

  ngOnInit(){

  }

  answerDeletion(answer: Answer) {
    this.quizService.deleteAnswer(this.question, answer);
    this.question.answers.splice(this.question.answers.indexOf(answer),1)
  }

  answerEdition(selected: Question){
    this.quizService.setSelectedAnswer(selected.id.toString());
    this.router.navigate(["/edit-answer/",selected.id.toString()])
  }
}