import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import localeFr from '@angular/common/locales/fr';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  private curStatus: string;

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizEdited: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {

  }

  ngOnInit() {
    this.curStatus = sessionStorage.getItem("status")
  }

  selectQuiz() {
    this.quizSelected.emit(this.quiz);
  }

  editQuiz() {
    this.quizEdited.emit(this.quiz);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizDeleted.emit(quiz);
  }
}
