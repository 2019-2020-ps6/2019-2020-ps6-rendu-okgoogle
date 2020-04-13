import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

import { QuizService } from '../../../services/quiz.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.scss']
})
export class CreateThemeComponent implements OnInit {
  
  private themes: Theme[] = [];
  public ThemeForm: FormGroup;
  public themeCreer: boolean;

  constructor(private route: ActivatedRoute,private themeService: ThemeService,public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initialiseForm();
  }

  ngOnInit() {
  }

  initialiseForm(){
    this.ThemeForm = this.formBuilder.group({
      name: [''],
      imageUrl: ''
    });
  }


  addTheme() {
    const themeToCreate: Theme = this.ThemeForm.getRawValue() as Theme;

    this.themeService.addTheme(themeToCreate);

    this.themeCreer = true;
    this.initialiseForm()
  }

}
