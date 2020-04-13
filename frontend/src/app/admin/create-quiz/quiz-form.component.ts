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
  quizCreer: boolean;
  

  constructor(private route: ActivatedRoute,private themeService: ThemeService,public formBuilder: FormBuilder, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl:['', Validators.required],
      imageDefault: false
    });
  }

  get lesThemes(): Theme[]{
    return this.themes;
  }

  ngOnInit() {
    this.themeService.setThemesFromUrl();
    this.themeService.themes$.subscribe((theme) => this.themes = theme);
  }

  addQuiz() {
    if(this.quizForm.valid){
      const id = +this.route.snapshot.paramMap.get('themeid');
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      
      quizToCreate.themeId = id.toString();
  
      quizToCreate.questions = [];
      quizToCreate.creationDate = new Date();

      if(this.quizForm.get("imageDefault").value == true)
      quizToCreate.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWXDFTonXk2JDFeUHA4nqPrDr1slhbB-NH21xuc0jb_r5LzFG_&usqp=CAU";


      this.quizService.addQuiz(quizToCreate.themeId.toString(),quizToCreate);
  
      console.log(quizToCreate)
  
      this.quizCreer = true;
    }
  }

}
