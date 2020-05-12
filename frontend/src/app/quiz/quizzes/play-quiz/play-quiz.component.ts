import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/services/game.service';
import { Question } from 'src/models/question.model';
import { Theme } from 'src/models/theme.model';
import { Answer } from 'src/models/answer.model';
import { ThemeService } from 'src/services/theme.service';
import { Location } from '@angular/common';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

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
  public playSong: boolean = false;
  public afficheIndice: boolean = false;
  public quizDebut: boolean;
  public menu: boolean = false;
  public replay: boolean = false;
  public questionPrec: boolean;
  public modalIn: boolean = false;
  public modalOut: boolean = false;
  public user : User;
  public context : AudioContext;
  public source: AudioBufferSourceNode;

  @ViewChild('progressBar', { read: ElementRef, static: false }) progressBar: ElementRef;

  constructor(private _location: Location, private route: ActivatedRoute, public quizService: QuizService, public themeService: ThemeService, private gameService: GameService, private userService:UserService) {
    
  }

  ngOnInit() {
    const themeid = this.route.snapshot.paramMap.get('themeid');
    const quizid = this.route.snapshot.paramMap.get('quizid');
    this.themeService.setSelectedTheme(themeid.toString())
    this.themeService.themeSelected$.subscribe((theme) => this.curTheme = theme)
    this.gameService.setSelectedQuiz(quizid.toString(), themeid.toString());
    this.gameService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz
      this.gameService.questionSelected$.subscribe((question) => {
        this.questionSelected = question
      })
      this.userService.setSelectedUser(sessionStorage.getItem("user_id"))
      this.userService.userSelected$.subscribe((user)=>{
        this.user = user;
        console.log(user.surname);
      })
    });
  }

  selectAnswer(answer: Answer) {

    var divIndice = document.querySelector("#indice")
    if (divIndice.textContent != "")
      divIndice.innerHTML = "";

    //quiz pas fini
    if (answer.isCorrect && this.ptrQuestion != this.quiz.questions.length - 1) {
      this.modalIn = true;
      this.modalOut = false;
      this.quizDebut = false;
      const progressBar = this.progressBar.nativeElement;
      progressBar.children[this.ptrQuestion].classList.add("completed")
      this.ptrQuestion++;
      progressBar.children[this.ptrQuestion].classList.add("active") 
      this.source.stop();
      this.afficheIndice = false;
      this.playSong = false;
      var interval = setInterval(() => {
        this.timerPopup--;
        if (this.timerPopup == 0) {
          clearInterval(interval);
          return;
        }
      }, 1000);

      document.body.classList.add('modal-active')
      setTimeout(() => {
        this.modalOut = true;
        document.body.classList.remove('modal-active')
      }, 5000)
      this.timerPopup = 5;
    }
    //quiz fini
    else if (this.questionSelected.id === this.quiz.questions[this.quiz.questions.length - 1].id && answer.isCorrect === true) {
      this.quizDebut = false;
      this.afficheIndice = false;
      this.playSong = false;
      this.modalOut = false;
      this.quizFini = true;
      this.modalIn = true;
      document.body.classList.add('modal-active')
    }

    this.gameService.setSelectedAnswer(this.questionSelected.id.toString(), answer.id.toString())
  }


  play(buffer) {
    this.context = new AudioContext();
    this.context.decodeAudioData(buffer, (data)=>{
      this.source = this.context.createBufferSource();
      this.source.buffer = data;
      this.source.connect(this.context.destination);
      this.source.start();
    })
  }

  aide() {
    if (this.questionSelected.indice != "") {
      this.afficheIndice = true
    } else {
      this.playSong = true;
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      this.quizService.getSong(themeid, quizid,this.questionSelected.sonUrl) 
      this.quizService.currentFileUpload$.subscribe((file)=>{
        this.play(file);
      })
    }
    this.gameService.GiveClues()
  }

  questionPrecedente() {
    if (this.ptrQuestion > 0) {
      this.source.stop();
      this.playSong = false;
      this.afficheIndice = false;
      this.gameService.previousQuestion()
      this.ptrQuestion--;
      const progressBar = this.progressBar.nativeElement;
      progressBar.children[this.ptrQuestion].classList.add("active")
      progressBar.children[this.ptrQuestion].classList.remove("completed")
      progressBar.children[this.ptrQuestion + 1].classList.remove("active")
    }
  }

  changeFont(event) {
    var pInSpan = document.querySelectorAll(".zommableEnonce")

    for (var i in pInSpan) {
      pInSpan[i].setAttribute("style", "font-size:" + event.target.value + "px;");
    }
  }

  changeContrastToBlack() {
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-black");
    mainContent.classList.remove("contrast-white");
  }

  changeContrastToWhite() {
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-white");
    mainContent.classList.remove("contrast-black");
  }

  rejouer() {
    this.quizDebut = true;
    this.quizFini = false;
    this.replay = true;
    var interval = setInterval(() => {
      this.timerPopup--;
      if (this.timerPopup == 0) {
        clearInterval(interval);
        return;
      }
    }, 1000);
    document.body.classList.add('modal-active')
    setTimeout(() => {
      this.modalOut = true;
      this.ptrQuestion = 0;
      const themeid = this.route.snapshot.paramMap.get('themeid');
      const quizid = this.route.snapshot.paramMap.get('quizid');
      this.themeService.setSelectedTheme(themeid.toString())
      this.themeService.themeSelected$.subscribe((theme) => this.curTheme = theme)
      this.gameService.setSelectedQuiz(quizid.toString(), themeid.toString());
      this.gameService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz
        this.gameService.questionSelected$.subscribe((question) => {
          this.questionSelected = question
        })
      });
      document.body.classList.remove('modal-active')
    }, 5000)
    this.timerPopup = 5;
  }

  quitter() {
    this.modalOut = true;
    this.goBack();
  }

  switchMenu() {
    if (this.menu == false) {
      this.menu = true;
    } else {
      this.menu = false;
    }
  }

  goBack() {
    this._location.back();
  }
}