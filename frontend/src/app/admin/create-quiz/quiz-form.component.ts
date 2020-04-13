import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: [''],
      imageUrl:''
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

    const id = +this.route.snapshot.paramMap.get('themeid');
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    
    quizToCreate.themeId = id.toString();

    quizToCreate.questions = [];
    quizToCreate.creationDate = new Date();

    this.quizService.addQuiz(quizToCreate.themeId.toString(),quizToCreate);

    console.log(quizToCreate)

    this.quizCreer = true;
  }

}
