import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {


  public questionForm: FormGroup;
  public questionMode: number = 1 // 1 = "Image pour énoncé et text pour réponses" ; 2 = "Text pour énoncé et image pour réponses";
  public hintMode: number = 1 // 1= indice text ; 2=Indice par son
  public fileName: string = "";
  public questionToCreate: Question;
  public count: number = 0;
  public withSong: boolean = false;
  public colored: boolean;
  public file : File;


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
    if (this.hintMode == 2) {
      this.questionForm.get("indice").setValue("")
      this.hintMode = 1;
      this.withSong = true;
    } else {
      this.hintMode = 2
      this.withSong = false;
    }
  }

  reset() {
    this.fileName = ""
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    if (this.questionMode == 1) {
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

      if (this.withSong && this.hintMode == 2) {
        const file = this.file
        const songName = this.questionToCreate.id + "." + file.name.split(".")[1]
        this.fileName = songName;
        this.quizService.addASong(themeid, quizid, this.file, songName);
      }

      this.questionToCreate.sonUrl = this.fileName

      this.quizService.addQuestion(themeid, quizid, this.questionToCreate);
      this.initializeQuestionForm();
      this.reset()
      this.resetLimit()
    }
  }

  ImageInQuestion() {
    if (this.questionMode == 2) {
      this.questionMode = 1;
    }
  }

  ImageInAnswers() {
    if (this.questionMode == 1) {
      this.questionMode = 2;
    }
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
}