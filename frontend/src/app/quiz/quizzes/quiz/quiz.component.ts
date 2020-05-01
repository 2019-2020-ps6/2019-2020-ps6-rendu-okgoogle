import { Component, OnInit, Input, Output, EventEmitter, Query} from '@angular/core';
import { Quiz } from '../../../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  private curStatus: string;
  private confirmationDelete: boolean = false;

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

  deleteQuiz(quiz: Quiz, confirmation: boolean) {
    if(confirmation){
      this.quizDeleted.emit(quiz);
      this.confirmationDelete = false;
    }else{
      this.confirmationDelete = false;
    }
  }
  deleteConfirmation(){
      this.confirmationDelete = true;
  }
}

