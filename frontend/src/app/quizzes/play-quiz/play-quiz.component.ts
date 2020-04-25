import { Component, OnInit} from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/result.service';
import { Question } from 'src/models/question.model';
import { Theme } from 'src/models/theme.model';
import { Answer } from 'src/models/answer.model';
import { ThemeService } from 'src/services/theme.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss'],
  })

  export class PlayQuizComponent implements OnInit {

    public quiz: Quiz;
    public curTheme: Theme;
    public questionSelected: Question;
    public ptrQuestion: number = 0;
    public quizFini = false;
    public timerPopup = 5;
    public sonUrlQuestionActuelle = "";
    public playSong : boolean = false;
    public afficheIndice : boolean = false;
    public quizDebut: boolean;
    public menu : boolean = false;
  questionPrec: boolean;

    constructor(private _location: Location,private route: ActivatedRoute,public quizService: QuizService,public themeService: ThemeService,private resService: ResultService) {      

    }
    
    ngOnInit() {    
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      this.themeService.setSelectedTheme(themeid.toString())
      this.themeService.themeSelected$.subscribe((theme)=>this.curTheme = theme)
      this.resService.setSelectedQuiz(quizid.toString(),themeid.toString());
      this.resService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz
        this.resService.questionSelected$.subscribe((question) =>{
          this.questionSelected = question
          this.sonUrlQuestionActuelle = "src/assets/sons/"+this.questionSelected.sonUrl
          setTimeout(()=>{
            this.ptrQuestion = this.resService.ptrQuestion
            if(this.ptrQuestion != 0){
              for(var i = 0; i< this.ptrQuestion; i++){
                document.querySelector(".progressbar-steps").children[i].classList.add("completed")
                document.querySelector(".progressbar-steps").children[i].classList.add("active")
              }
              document.querySelector(".progressbar-steps").children[i].classList.add("active")
            }
          },500)
        })
      });
    }

    
    selectAnswer(answer: Answer){

      var divIndice = document.querySelector("#indice")
      if(divIndice.textContent != "")
        divIndice.innerHTML="";

      //quiz pas fini
      if( answer.isCorrect && this.ptrQuestion != this.quiz.questions.length-1){
        this.quizDebut = false;
        document.querySelector(".progressbar-steps").children[this.ptrQuestion].classList.add("completed")
        this.ptrQuestion++;
        document.querySelector(".progressbar-steps").children[this.ptrQuestion].classList.add("active")
        this.afficheIndice = false;
        this.playSong = false;
        this.sonUrlQuestionActuelle = "src/assets/sons/"+this.questionSelected.sonUrl;

        document.body.querySelector('#modal-container').removeAttribute('class')
        document.body.querySelector('#modal-container').classList.add('modalF')
        var interval = setInterval(()=> {
            this.timerPopup--;
            if (this.timerPopup == 0){
              clearInterval(interval);
              return;
            } 
        }, 1000);

        document.body.classList.add('modal-active')
        setTimeout(()=>{
          document.body.querySelector('#modal-container').classList.add('out');
          document.body.classList.remove('modal-active')
        },5000)
        this.timerPopup = 5;
      }
      //quiz fini
      else if(this.questionSelected.id === this.quiz.questions[this.quiz.questions.length-1].id && answer.isCorrect === true){
        document.body.querySelector('#modal-container').removeAttribute('class')
        this.quizFini = true;
        document.body.querySelector('#modal-container').classList.add('modalF')
        document.body.classList.add('modal-active')
        setTimeout(()=>{
          document.body.querySelector('#modal-container').classList.add('out');
          document.body.classList.remove('modal-active')
          this.goBack()
        },100000)
      }
      
      this.resService.setSelectedAnswer(this.questionSelected.id.toString(),answer.id.toString())
    }

    aide(){
      if(this.questionSelected.indice != ""){
        this.afficheIndice = true
      }else{
        this.playSong = true;
        console.log(this.playSong)
      }
  
      this.resService.GiveClues()
    }

    questionPrecedente(){
      if(this.ptrQuestion > 0){
        this.resService.previousQuestion()
        this.ptrQuestion--;
        document.querySelector(".progressbar-steps").children[this.ptrQuestion].classList.add("active")
        document.querySelector(".progressbar-steps").children[this.ptrQuestion].classList.remove("completed")
        document.querySelector(".progressbar-steps").children[this.ptrQuestion+1].classList.remove("active")
      }
    }

    changeFont(event){
      console.log(event.target.value)
      var pInSpan = document.querySelectorAll(".zommable")

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

    rejouer(){
      this.quizDebut = true;
      this.quizFini = false;
      document.body.querySelector('#modal-container').removeAttribute('class')
      document.body.querySelector('#modal-container').classList.add('modalF')
      var interval = setInterval(()=> {
          this.timerPopup--;
          if (this.timerPopup == 0){
            clearInterval(interval);
            return;
          }
      }, 1000);
      document.body.classList.add('modal-active')
      setTimeout(()=>{
        document.body.querySelector('#modal-container').classList.add('out');
        document.body.classList.remove('modal-active')
      },5000)
      this.timerPopup = 5;
      this.ngOnInit()
    }

    quitter(){
      document.body.querySelector('#modal-container').classList.add('out');
      this.goBack()
    }

    switchMenu(){
      if(this.menu == false){
        this.menu = true;
      }else{
        this.menu = false;
      }
    }

    goBack(){
      this._location.back();
    }
}