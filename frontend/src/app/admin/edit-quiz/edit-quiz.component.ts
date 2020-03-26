import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class editQuizComponent implements OnInit {

  public quiz: Quiz;
  public curTheme: Theme

  constructor(private _location: Location,private route: ActivatedRoute, private quizService: QuizService, private themeService: ThemeService) { 
      setTimeout(()=> {
        const id = this.route.snapshot.paramMap.get('quizid');
        this.quizService.setSelectedQuiz(id.toString());
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
        this.themeService.themeSelected$.subscribe((theme)=> this.curTheme = theme)
      },100)

  }
  back_click(){
    this._location.back();
  }

  ngOnInit() {
    
  }

}