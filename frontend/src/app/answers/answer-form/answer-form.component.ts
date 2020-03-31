import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

    @Input()
    answer:Answer

  public answerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.answerForm = this.formBuilder.group({
      value: this.answer.value,
      isCorrect: this.answer.isCorrect
    });
  }

  ngOnInit() {
  }

  editAnswer() {
    if(this.answerForm.valid) {
      const answer = this.answerForm.getRawValue() as Answer;
      this.quizService.editAnswer(answer);
    }
  }
}