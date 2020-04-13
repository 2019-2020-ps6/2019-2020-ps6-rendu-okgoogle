import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class editQuestionComponent implements OnInit {


  public question:Question
  public questionForm: FormGroup;

  constructor(private _location: Location,private route: ActivatedRoute, private quizService: QuizService,private themeService: ThemeService, private formBuilder: FormBuilder) { 
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      const questionid = this.route.snapshot.paramMap.get('questionid');
      this.quizService.setSelectedQuestion(themeid,quizid,questionid);
      this.quizService.questionSelected$.subscribe((question)=> {
        this.question = question
        this.initializeQuestionForm();
      })
  }
  
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: this.question.label,
      indice: this.question.indice,
    });
  }
  
  ngOnInit() {

  }

  editQuestion(){
    if(this.questionForm.valid) {
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      const questionid = this.route.snapshot.paramMap.get('questionid');
      const question = this.questionForm.getRawValue() as Question;
      question.quizId = parseInt(quizid);
      this.quizService.editQuestion(themeid,quizid,questionid,this.question)
      this.back_click()
    }
  }

  back_click(){
    this._location.back();
  }

}