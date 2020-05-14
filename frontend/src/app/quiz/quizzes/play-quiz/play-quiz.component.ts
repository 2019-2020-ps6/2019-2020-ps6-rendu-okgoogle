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
  styleUrls: ['./play-quiz.component.scss']
})

export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public curTheme: Theme;
  public user: User;

  public questionSelected: Question;
  public ptrQuestion: number = 0;

  public timerPopup = 5;
  public modalOut: boolean = false;
  public modalIn: boolean = false;

  public sonUrlQuestionActuelle = "";
  public playSong: boolean = false;
  public afficheIndice: boolean = false;

  public menu: boolean = false;

  public quizDebut: boolean;
  public replay: boolean = false;
  public quizFini = false;
  public questionPrec: boolean;

  public buffAudio: ArrayBuffer;
  public source: AudioBufferSourceNode;

  @ViewChild('progressBar', { read: ElementRef, static: false }) progressBar: ElementRef;

  constructor(private _location: Location, private elementRef : ElementRef , private route: ActivatedRoute, public quizService: QuizService, public themeService: ThemeService, private gameService: GameService, private userService: UserService) {

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
        const themeid = this.route.snapshot.paramMap.get('themeid');
        const quizid = this.route.snapshot.paramMap.get('quizid');
        if(this.questionSelected.sonUrl){
          this.quizService.getSong(themeid, quizid, this.questionSelected.sonUrl)
          this.quizService.currentFileUpload$.subscribe((arrBuf) => {
            this.buffAudio = arrBuf;
          })
        }
      })
      this.userService.setSelectedUser(sessionStorage.getItem("user_id"))
      this.userService.userSelected$.subscribe((user) => {
        this.user = user;
      })
    });
  }

  selectAnswer(answer: Answer) {
    //quiz pas fini
    if (answer.isCorrect && this.ptrQuestion != this.quiz.questions.length - 1) {

      if (this.source != undefined && this.playSong)
        this.source.stop();
      this.modalIn = true;
      this.modalOut = false;
      this.quizDebut = false;
      this.afficheIndice = false;
      this.playSong = false;

      //Avancement de la timeline
      const progressBar = this.progressBar.nativeElement;
      progressBar.children[this.ptrQuestion].classList.add("completed")
      this.ptrQuestion++;
      progressBar.children[this.ptrQuestion].classList.add("active")


      //Timer
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
        this.source.stop();
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
      this.source.stop()
      document.body.classList.add('modal-active')
    }

    this.gameService.setSelectedAnswer(this.questionSelected.id.toString(), answer.id.toString())
  }


  play() {
    var context = new AudioContext();

    context.decodeAudioData(this.buffAudio, (data) => {
      console.log(data)
      this.source = context.createBufferSource();
      this.source.buffer = data;
      this.source.connect(context.destination);
      if (this.playSong)
        this.source.start();
    })
  }

  aide() {
    if (this.questionSelected.indice != "") {
      this.afficheIndice = true
    } else if (this.playSong != true) {
      this.playSong = true;
      this.play()
    }
    this.gameService.GiveClues()
  }

  questionPrecedente() {
    if (this.ptrQuestion > 0) {
      if(this.source != undefined && this.playSong)
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
    this.elementRef.nativeElement.querySelectorAll(".answerValue").forEach(element => {
      element.setAttribute("style", "font-size:" + (15+parseInt(event.target.value))+ "px;");
    });

    console.log(this.elementRef.nativeElement.querySelectorAll(".zoommable"))

    this.elementRef.nativeElement.querySelectorAll(".zoommable").forEach(element => {
      element.setAttribute("style", "font-size:" + (25+parseInt(event.target.value))+ "px;");
    });

  

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
      this.source.stop()
    }, 5000)
    this.timerPopup = 5;
  }

  quitter() {
    this.modalOut = true;
    this.source.stop()
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