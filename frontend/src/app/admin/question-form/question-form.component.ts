import { Component, OnInit,ViewChild, ElementRef,Renderer2, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit{


  public questionForm: FormGroup;
  private mode: string = "Image question et text pour question";
  private modeAide : number = 0 //0 = indice text 1=Indice par son
  fichierName: string = "";
  questionToCreate:Question;
  

  constructor(private renderer:Renderer2,private route:ActivatedRoute,public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();

  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      imgUrl: '',
      sonUrl: [''],
      indice: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  @ViewChild('myInput',{ static: true }) 
  song: ElementRef;

  reset() {
      this.song.nativeElement.value = '';
  }

  switchModeAide(){
    if(this.modeAide == 0){
      this.questionForm.get("indice").clearValidators()
      this.modeAide = 1;
    }else{
      this.questionForm.get("indice").setValidators(Validators.required)
      this.modeAide = 0
    }
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
        value: ['', Validators.required],
        isCorrect: [false, Validators.required],
      });
    }else{
      return this.formBuilder.group({
        value:['', Validators.required],
        imageUrl: ['', Validators.required],
        isCorrect: [false, Validators.required],
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
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');

      this.questionToCreate = this.questionForm.getRawValue() as Question;

      console.log(this.questionToCreate.label)

      this.questionToCreate.sonUrl = this.fichierName

      this.quizService.addQuestion(themeid,quizid,this.questionToCreate);
      this.initializeQuestionForm();
      this.reset()
    }
  }

  envoiFichier(fichiers:FileList){
    const themeid = this.route.snapshot.paramMap.get('themeid');
    const quizid = this.route.snapshot.paramMap.get('quizid');
    console.log(fichiers.item(0).name)
    const songName = fichiers.item(0).name.split(".")[0] + Date.now() +"."+fichiers.item(0).name.split(".")[1]
    this.fichierName = songName;
    this.quizService.addASong(themeid,quizid,fichiers.item(0), songName);
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