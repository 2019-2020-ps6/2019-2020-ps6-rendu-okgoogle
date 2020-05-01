import { Component, OnInit,ViewChild, ElementRef,Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit{


  public questionForm: FormGroup;
  private mode: string = "Image pour énoncé et text pour réponses";
  private modeAide : number = 0 //0 = indice text ; 1=Indice par son
  fichierName: string = "";
  questionToCreate:Question;
  count: number = 0;
  

  constructor(private route:ActivatedRoute,public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();

  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      imgUrl: '',
      sonUrl: [''],
      indice: [''],
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
      this.questionForm.get("indice").setValue("")
      this.modeAide = 1;
    }else{
      this.modeAide = 0
    }
  }

  ngOnInit() {

  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
  
  private createAnswer() {
    if(this.mode === "Image pour énoncé et text pour réponses"){
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
    this.limit();
    this.answers.push(this.createAnswer());
    // this.notChecked();
  }

  changeColorOnChecked(){
    var element = <HTMLInputElement> document.querySelector('.correctOrNot');
    var parent = element.parentElement;
    if(element.checked){
      parent.style.backgroundColor = "LightGreen";
    }else{
      parent.style.backgroundColor = "initial";
    }
  }

  isChecked(){
    //changement de background pour la bonne réponse
    var element = <HTMLInputElement> document.querySelector('.correctOrNot');
    if(element.checked){
      var parent = element.parentElement;
      parent.style.backgroundColor = "LightGreen";
    }else{
      var parent = element.parentElement;
      parent.removeChild(element);
      var parentText = document.getElementById("label").parentElement;
      parentText.removeChild(document.getElementById("label"));
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
    if( this.mode === "Text pour énoncé et image pour réponses"){
      this.mode = "Image pour énoncé et text pour réponses";
    }
  }

  QuatreImageUneQuestionText(){
    if( this.mode === "Image pour énoncé et text pour réponses"){
      this.mode = "Text pour énoncé et image pour réponses";
    }
  }

  limit(){
    this.count = this.count + 1;
    //limits to 4 answers
    console.log(this.count);
    if(this.count == 4){
        var boutonAjoutReponse = document.querySelector('#AnswerPart')
        boutonAjoutReponse.remove();
    }
  }
}