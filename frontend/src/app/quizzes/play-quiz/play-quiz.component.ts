import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/result.service';
import { Question } from 'src/models/question.model';
import { Theme } from 'src/models/theme.model';
import { Answer } from 'src/models/answer.model';
import { ThemeService } from 'src/services/theme.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
  })

  export class PlayQuizComponent implements OnInit {
    public quiz: Quiz;
    public curTheme: Theme;
    public questionSelected: Question;

    constructor(private _location: Location,private route: ActivatedRoute,public quizService: QuizService,public themeService: ThemeService,private resService: ResultService) {      
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
      var zoomElement = document.querySelector("#zoom")
      zoomElement.setAttribute("value", "20");

      var divIndice = document.querySelector("#indice")
      if(divIndice.textContent != "")
        divIndice.innerHTML="";

      if( this.questionSelected != this.quiz.questions[this.quiz.questions.length-1] && answer.isCorrect === true){
        document.body.querySelector('#modal-container').removeAttribute('class')
        document.body.querySelector('.modal').firstElementChild.setAttribute('src', "https://i.pinimg.com/originals/a8/6e/f4/a86ef49a467502013d0521c55deebe85.png")
        document.body.querySelector('#modal-container').classList.add('modalF')
        document.body.classList.add('modal-active')
        setTimeout(()=>{
          document.body.querySelector('#modal-container').classList.add('out');
          document.body.classList.remove('modal-active')
        },1000)
      }
      else if(this.questionSelected == this.quiz.questions[this.quiz.questions.length-1] && answer.isCorrect === true){
        document.body.querySelector('#modal-container').removeAttribute('class')
        document.body.querySelector('.modal').firstElementChild.removeAttribute('src')
        document.body.querySelector('.modal').firstElementChild.setAttribute('src', "https://thumbs.dreamstime.com/b/banni%C3%A8re-de-bravo-91022451.jpg")
        document.body.querySelector('.modal').firstElementChild.setAttribute('width', "300")
        document.body.querySelector('#modal-container').classList.add('modalF')
        document.body.classList.add('modal-active')
        setTimeout(()=>{
          document.body.querySelector('#modal-container').classList.add('out');
          document.body.classList.remove('modal-active')
          this.goBack();
        },3000)
      }
      this.resService.setSelectedAnswer(this.questionSelected.id.toString(),answer.id.toString())
    }

    aide(){
      var divIndice = document.querySelector("#indice")
      divIndice.innerHTML=this.questionSelected.indice;
  
      var parentNode = document.querySelector("#quiz")
  
      parentNode.insertBefore(divIndice, parentNode.firstElementChild.nextElementSibling.nextElementSibling)
  
      this.resService.GiveClues()
    }

    questionPrecedente(){
      this.resService.previousQuestion()
    }

    changeFont(event){
      console.log(event.target.value)
      var pInSpan = document.querySelectorAll(".reponse")

      for (var i in pInSpan) {
        pInSpan[i].setAttribute("style", "font-size:"+event.target.value+"px;");
      }

      var questionEtIndice = document.querySelectorAll(".enteteQuiz")

      for(var i in questionEtIndice){
        questionEtIndice[i].setAttribute("style", "font-size:"+event.target.value+"px;");
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

    goBack(){
      this._location.back();
    }
}