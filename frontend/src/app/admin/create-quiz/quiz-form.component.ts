import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  
  public themes: Theme[] = [];
  public curTheme: Theme;
  public quizForm: FormGroup;
  public WithImage: boolean =true;
  quizCreer: boolean;
  public imageUrl: string = ""
  

  constructor(private route: ActivatedRoute,private themeService: ThemeService,public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl:['', Validators.required],
    });
  }

  ngOnInit() {
    this.themeService.setThemesFromUrl();
    this.themeService.themes$.subscribe((theme) => this.themes = theme);
  }

  switch_mode(){
    if(this.WithImage == true){
      this.WithImage = false;
      this.quizForm.controls["imageUrl"].clearValidators()
      this.quizForm.controls["imageUrl"].updateValueAndValidity()
    }else{
      this.WithImage = true;
      this.quizForm.controls["imageUrl"].setValidators(Validators.required)
      this.quizForm.controls["imageUrl"].updateValueAndValidity()
    }
  }
  displayImage(){
    this.imageUrl= this.quizForm.get("imageUrl").value
  }

  addQuiz() {
    if(this.quizForm.valid){
      const id = +this.route.snapshot.paramMap.get('themeid');
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      
      quizToCreate.themeId = id.toString();
  
      quizToCreate.questions = [];
      quizToCreate.creationDate = new Date();
      if(this.WithImage == false)
          quizToCreate.imageUrl = "https://images-na.ssl-images-amazon.com/images/I/21K1%2BsQckhL._AC_SY355_.jpg";


      this.quizService.addQuiz(quizToCreate.themeId.toString(),quizToCreate);
  
      console.log(quizToCreate)
  
      this.quizCreer = true;
    }
  }

}
