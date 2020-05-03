import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class editQuizComponent implements OnInit {

  public quiz: Quiz;
  public curTheme: Theme
  public QuatreImg1question = "./QuatreImgUnequestion.jpg";
  public UneImg4question = "./UneImgQuatreReponse.jpg";
  public quizForm: FormGroup;
  public edit_quiz: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private quizService: QuizService, private themeService: ThemeService) { 
    
  }
  
  ngOnInit() {
    const themeid = this.route.snapshot.paramMap.get('themeid');
    const quizid = this.route.snapshot.paramMap.get('quizid');
    this.themeService.setSelectedTheme(themeid.toString())
    this.themeService.themeSelected$.subscribe((theme)=>this.curTheme = theme)
    this.quizService.setSelectedQuiz(quizid.toString(),themeid.toString());
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz
      this.initializeQuizForm()
    });
  }


  private initializeQuizForm() {
    this.quizForm = this.formBuilder.group({
      name: this.quiz.name,
      imageUrl:this.quiz.imageUrl
    });
  }

  editQuiz(){
    this.edit_quiz=true;
  }

  validateQuiz(){
    const themeid = this.route.snapshot.paramMap.get('themeid');
    const quizid = this.route.snapshot.paramMap.get('quizid');
    const quiz = this.quizForm.getRawValue() as Quiz;
    this.quizService.editQuiz(themeid,quizid,quiz)
    this.edit_quiz = false;
  }

  annulerQuiz(){
      this.edit_quiz = false;
  }

}