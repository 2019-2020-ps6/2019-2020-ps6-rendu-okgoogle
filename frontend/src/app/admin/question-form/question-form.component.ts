import { Component, OnInit, ElementRef,Renderer2, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit{


  public questionForm: FormGroup;
  private mode: string = "Image question et text pour question";

  constructor(private renderer: Renderer2,private http: HttpClient,public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();

  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      imgUrl: '',
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

  verifyUrlQuestion(){
    var ParentNode = document.querySelector("#ImageUpload")
    var divAnswer = document.createElement("div")
    divAnswer.className="ImageUp"
    divAnswer.innerHTML="Question image uploadé: "
    var img = document.createElement("img")
    img.className="imageQuestion"
    img.setAttribute("src", this.questionForm.get(['imgUrl']).value);
    img.setAttribute("style", "max-width:100px")
    divAnswer.appendChild(img)
    ParentNode.appendChild(divAnswer)
  }
  
  private createAnswer() {
    if(this.mode === "Image question et text pour question"){
      return this.formBuilder.group({
        value: '',
        isCorrect: false,
      });
    }else{
      return this.formBuilder.group({
        value: '',
        imageUrl: '',
        isCorrect: false,
      });
    }
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
    this.notChecked();
  }

  isChecked(){
    //changeement de background pour la bonne réponse
    //var element = <HTMLInputElement> document.getElementById("correctOrNot");
    var element = <HTMLInputElement> document.querySelector('.correctOrNot');


    if(element.checked){
      var parent = element.parentElement;
      parent.style.backgroundColor = "LightGreen";
    }else{
      var parent = element.parentElement;
      parent.removeChild(element);
      var parentText = document.getElementById("label").parentElement;
      parentText.removeChild(document.getElementById("label"));
      // var newText = document.createElement("label");
      // newText.innerText = "incorrect";
      // parentText.appendChild(newText);
      //parent.style.backgroundColor = "#aaa";
    }
  }

  notChecked(){
    var element = <HTMLInputElement> document.querySelector('.correctOrNot');
    var parent = element.parentElement;
    parent.removeChild(element);
    var parentText = document.getElementById("label").parentElement;
    parentText.removeChild(document.getElementById("label"));
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

  UneImageQuatreText(){
    if( this.mode === "Text question et image pour reponse"){
      this.mode = "Image question et text pour question";
    }
  }

  QuatreImageUneQuestionText(){
    if( this.mode === "Image question et text pour question"){
      this.mode = "Text question et image pour reponse";
    }
  }
}