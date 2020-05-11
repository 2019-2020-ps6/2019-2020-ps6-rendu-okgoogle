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
export class QuestionFormComponent implements OnInit {


  public questionForm: FormGroup;
  private mode: string = "Image pour énoncé et text pour réponses";
  private modeAide: number = 0 //0 = indice text ; 1=Indice par son
  fichierName: string = "";
  questionToCreate: Question;
  count: number = 0;
  withSong: boolean = false;
  private colored: boolean;


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

  @ViewChild('sonUpload', { static: false })
  song: ElementRef;

  switchModeAide() {
    if (this.modeAide == 0) {
      this.questionForm.get("indice").setValue("")
      this.modeAide = 1;
      this.withSong = true;
    } else {
      this.modeAide = 0
      this.withSong = false;
    }
  }

  ngOnInit() {

  }

  reset(){
    this.withSong = false;
    this.fichierName = ""
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    if (this.mode === "Image pour énoncé et text pour réponses") {
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


  changeColorOnChecked(i:any) {
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


  addQuestion() {

    if (this.questionForm.valid) {
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');

      this.questionToCreate = this.questionForm.getRawValue() as Question;

      console.log(this.questionToCreate.label)
      
      if(this.withSong){
        const file = this.song.nativeElement.files[0];
        const songName = Date.now() +"."+file.name.split(".")[1]
        this.fichierName = songName;
        this.quizService.addASong(themeid,quizid,this.song.nativeElement.files[0], songName);
      }

      this.questionToCreate.sonUrl = this.fichierName

      this.quizService.addQuestion(themeid, quizid, this.questionToCreate);
      this.initializeQuestionForm();
      this.reset()
      this.resetLimit()
    }
  }

  UneImageQuatreText() {
    if (this.mode === "Text pour énoncé et image pour réponses") {
      this.mode = "Image pour énoncé et text pour réponses";
    }
  }

  QuatreImageUneQuestionText() {
    if (this.mode === "Image pour énoncé et text pour réponses") {
      this.mode = "Text pour énoncé et image pour réponses";
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