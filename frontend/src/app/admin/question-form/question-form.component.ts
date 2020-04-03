import { Component, OnInit, ElementRef,Renderer2, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit{


  public questionForm: FormGroup;
  public urlImage: string ;

  constructor(private renderer: Renderer2,private http: HttpClient,public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      indice: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  verifyUrl(i: number){
    var ParentNode = document.querySelector("#ImageUpload")
    var divAnswer = document.createElement("div")
    divAnswer.className="ImageUp"
    divAnswer.innerHTML="Image "+(i+1)+" uploadé: "
    var img = document.createElement("img")
    img.className="image"+i+1
    img.setAttribute("src", this.questionForm.get(['answers',i,'imageUrl']).value);
    img.setAttribute("style", "max-width:100px")
    divAnswer.appendChild(img)
    ParentNode.appendChild(divAnswer)
  }
  
  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      imageUrl: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  addQuestion(i:number) {
    var ParentNode = document.querySelector("#ImageUpload")
    var child = ParentNode.lastElementChild;  
    while (child) { 
        ParentNode.removeChild(child); 
        child = ParentNode.lastElementChild; 
    } 
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(question);
      this.initializeQuestionForm();
    }
  }
}