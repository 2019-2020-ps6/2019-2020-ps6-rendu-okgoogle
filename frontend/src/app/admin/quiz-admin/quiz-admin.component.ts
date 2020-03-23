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
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {

  }

  ngOnInit() {  
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizDeleted.emit(quiz);
  }
}
