import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class editQuestionComponent implements OnInit {


  public question:Question
  public questionForm: FormGroup;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private formBuilder: FormBuilder) { 
      setTimeout(()=>{
        const id = this.route.snapshot.paramMap.get('questionid');
        this.quizService.setSelectedQuestion(id.toString())
        this.quizService.questionSelected$.subscribe((question)=> {
          this.question = question
          this.initializeQuestionForm();
        })
      }, 1000)
  }
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: this.question.label,
      answers: this.question.answers
    });
  }
  
  ngOnInit() {

  }

  editQuestion(){
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.editQuestion(this.question)
      alert("question modifier")
    }
  }

}