import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Answer } from '../../../../models/answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})

export class AnswerComponent {

  private curStatus: string;

  @Input()
  answer: Answer;

  @Output()
  answerDeleted: EventEmitter<Answer> = new EventEmitter<Answer>();

  @Output()
  answerEdited: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() {
    this.curStatus = sessionStorage.getItem("status");
  }

  editAnswer(){
    this.answerEdited.emit(this.answer)
  }
  deleteAnswer(){
    this.answerDeleted.emit(this.answer)
  }
}
