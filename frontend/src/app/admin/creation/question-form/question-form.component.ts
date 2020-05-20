import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { ActivatedRoute } from '@angular/router';

import { Mode } from "src/models/mode.enum";
import { Hint } from "src/models/hint.enum";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {

  public modeEnum = Mode;
  public hintEnum = Hint;
  public questionForm: FormGroup;
  public questionMode: number = this.modeEnum.imageInQuestionModel; 
  public hintMode: number = this.hintEnum.textHint;
  public fileName: string = "";
  public questionToCreate: Question;
  public count: number = 0;
  public withSong: boolean = false;
  public colored: boolean;
  public file : File;
  public highlightedImage_1: number;
  public highlightedImage_2: number;

  constructor(private route: ActivatedRoute, public formBuilder: FormBuilder, private quizService: QuizService) {
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

  switchHintMode() {
    if (this.hintMode == this.hintEnum.songHint) {
      console.log("vers texte")
      this.questionForm.get("indice").setValue("")
      this.hintMode = this.hintEnum.textHint;
    } else {
      console.log("vers song")
      this.hintMode = this.hintEnum.songHint
    }
  }

  reset() {
    this.fileName = ""
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    if (this.questionMode == this.modeEnum.imageInQuestionModel) {
      return this.formBuilder.group({
        value: ['', Validators.required],
        isCorrect: [false, Validators.required],
      });
    } else {
      return this.formBuilder.group({
        value: ['', Validators.required],
        imageUrl: ['', Validators.required],
        isCorrect: [false, Validators.required],
      });
    }
  }



  addAnswer() {
    this.limit();
    this.answers.push(this.createAnswer());
  }


  changeColorOnChecked(i: any) {
    var element = <HTMLInputElement>document.getElementsByClassName("correctOrNot")[i];
    var parent = element.parentElement;
    if (element.checked) {
      parent.style.backgroundColor = "LightGreen";
      this.colored = true;
    } else {
      parent.style.backgroundColor = "#AAA";
      this.colored = false;
    }
  }

  loadSong(event){
    this.file = event.target.files[0];
  }


  addQuestion() {

    if (this.questionForm.valid) {
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');

      this.questionToCreate = this.questionForm.getRawValue() as Question;
      
      this.questionToCreate.id = Date.now().toString();
      
      if (this.hintMode === this.hintEnum.songHint) {
        console.log("sdvjnsdvsd")
        const file = this.file
        const songName = this.questionToCreate.id + "." + file.name.split(".")[1]
        this.fileName = songName;
        console.log(file)
        console.log(this.fileName)
        this.quizService.addASong(themeid, quizid, this.file, songName);
        this.questionToCreate.indice =""
      }

      this.questionToCreate.sonUrl = this.fileName

      this.quizService.addQuestion(themeid, quizid, this.questionToCreate);
      this.initializeQuestionForm();
      this.reset()
      this.resetLimit()
    }
  }

  ImageInQuestion(newValue: number) {
    if (this.questionMode == this.modeEnum.imageInAnswersModel) {
      this.questionMode = this.modeEnum.imageInQuestionModel;
    }
    this.toggleHighlight(newValue, true);
  }

  ImageInAnswers(newValue: number) {
    if (this.questionMode == this.modeEnum.imageInQuestionModel) {
      this.questionMode = this.modeEnum.imageInAnswersModel;
    }
    this.toggleHighlight(newValue, false);
  }

  limit() {
    this.count = this.count + 1;
    //limits to 4 answers
    console.log(this.count);
    if (this.count == 4) {
      var boutonAjoutReponse = document.querySelector('#AnswerPart') as HTMLElement
      boutonAjoutReponse.style.visibility = "hidden";
    }
  }

  resetLimit() {
    this.count = 0;
    console.log(this.count);
    var boutonAjoutReponse = document.querySelector('#AnswerPart') as HTMLElement
    boutonAjoutReponse.style.visibility = "visible";
  }

  toggleHighlight(newValue: number, mode: boolean) {
    if(mode){
      if (this.highlightedImage_2 === newValue) {
        this.highlightedImage_2 = 0;
  
      }
      else {
        this.highlightedImage_2 = newValue;
        this.highlightedImage_1 = 0;
      }
    }
    else{
      if (this.highlightedImage_1 === newValue) {
        this.highlightedImage_1 = 0;
  
      }
      else {
        this.highlightedImage_1 = newValue;
        this.highlightedImage_2 = 0;
      }
    }
    
  }
}