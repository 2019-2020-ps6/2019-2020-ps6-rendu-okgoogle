import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  public ThemeForm: FormGroup;
  public themeCreer: boolean;
  public WithImage: boolean =true;

  constructor(private route: ActivatedRoute,private themeService: ThemeService,public formBuilder: FormBuilder, public quizService: QuizService) {
    this.initialiseForm();
  }

  ngOnInit() {
  }

  initialiseForm(){
    this.ThemeForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  switch_mode(){
    if(this.WithImage == true){
      this.WithImage = false;
      this.ThemeForm.controls["imageUrl"].clearValidators()
      this.ThemeForm.controls["imageUrl"].updateValueAndValidity()
    }else{
      this.WithImage = true;
      this.ThemeForm.controls["imageUrl"].setValidators(Validators.required)
      this.ThemeForm.controls["imageUrl"].updateValueAndValidity()
    }
  }

  addTheme() {
    if(this.ThemeForm.valid){
      const themeToCreate: Theme = this.ThemeForm.getRawValue() as Theme;
    
      if(this.WithImage == false)
        themeToCreate.imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWXDFTonXk2JDFeUHA4nqPrDr1slhbB-NH21xuc0jb_r5LzFG_&usqp=CAU";
  
      this.themeService.addTheme(themeToCreate);
  
      this.themeCreer = true;
      this.initialiseForm()
    }else{

    }
  }
}
