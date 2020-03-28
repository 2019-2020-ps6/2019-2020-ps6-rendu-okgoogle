import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-admin',
  templateUrl: './quiz-admin.component.html',
  styleUrls: ['./quiz-admin.component.scss']
})
export class QuizAdminComponent implements OnInit {


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
