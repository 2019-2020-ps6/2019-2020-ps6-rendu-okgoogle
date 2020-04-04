import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/result.service';
import { Question } from 'src/models/question.model';
import { Theme } from 'src/models/theme.model';
import { Answer } from 'src/models/answer.model';
import { ThemeService } from 'src/services/theme.service';

@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
  })

  export class PlayQuizComponent implements OnInit {
    public quiz: Quiz;
    public curTheme: Theme;
    public questionSelected: Question;
    private curStatus: string;

    constructor(private route: ActivatedRoute,public quizService: QuizService,public themeService: ThemeService,private resService: ResultService) {      
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      //this.themeService.setSelectedTheme(themeid.toString())
      this.themeService.themeSelected$.subscribe((theme)=>this.curTheme = theme)
      this.resService.setSelectedQuiz(quizid.toString(),themeid.toString());
      this.resService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz
        this.resService.questionSelected$.subscribe((question) => this.questionSelected = question)
      });

      
    }
  
    ngOnInit() {    
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      this.themeService.setSelectedTheme(themeid.toString())
      this.themeService.themeSelected$.subscribe((theme)=>this.curTheme = theme)
      this.resService.setSelectedQuiz(quizid.toString(),themeid.toString());
      this.resService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz
        this.resService.questionSelected$.subscribe((question) => this.questionSelected = question)
      });
    }

    selectAnswer(answer: Answer){
      this.resService.setSelectedAnswer(this.questionSelected.id.toString(),answer.id.toString())
    }

    aide(){
      this.resService.GiveClues()
    }

    questionPrecedente(){
      this.resService.previousQuestion()
    }

    changeFont(event){
      console.log(event.target.value)
      var pInSpan = document.querySelectorAll(".reponse")
      console.log(pInSpan)

      for (var i in pInSpan) {
        pInSpan[i].setAttribute("style", "font-size:"+event.target.value+"px;");
      }

    }

    changeContrastToBlack(){
      var mainContent = document.querySelector("html")
      mainContent.classList.add("contrast-black");
      mainContent.classList.remove("contrast-white");
    }

    changeContrastToWhite(){
      var mainContent = document.querySelector("html")
      mainContent.classList.add("contrast-white");
      mainContent.classList.remove("contrast-black");
    }
}