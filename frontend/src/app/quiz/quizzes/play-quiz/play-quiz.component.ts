import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  public displayHint: boolean = false;

  public menu: boolean = false;

  public beginningOfQuiz: boolean;
  public replay: boolean = false;
  public isFinishedQuiz = false;

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

  /**
   * Process when the user respond to a question
   * @param answer 
   */
  selectAnswer(answer: Answer) {

    // where quiz is not finished
    if (answer.isCorrect && this.ptrQuestion != this.quiz.questions.length - 1) {

      this.stopSong()
      this.modalIn = true;
      this.modalOut = false;
      this.beginningOfQuiz = false;
      this.displayHint = false;
      this.playSong = false;

      // Timeline advancement
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
        this.stopSong()
      }, 5000)
      this.timerPopup = 5;
    }

    // where quiz is finished
    else if (this.questionSelected.id === this.quiz.questions[this.quiz.questions.length - 1].id && answer.isCorrect === true) {
      this.beginningOfQuiz = false;
      this.displayHint = false;
      this.playSong = false;
      this.modalOut = false;
      this.isFinishedQuiz = true;
      this.modalIn = true;
      this.stopSong()
      document.body.classList.add('modal-active')
    }

    this.gameService.setSelectedAnswer(answer)
  }

  /**
   * Play a song if we have a song as hint
   */
  playSongAsHint() {
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

  /**
   * Allow user to use a hint
   */
  help() {
    if (this.questionSelected.indice != "") {
      this.displayHint = true
    } else if (this.playSong != true) {
      this.playSong = true;
      this.playSongAsHint()
    }
    this.gameService.GiveClues()
  }

  /**
   * Allow user to go back on the previous question
   */
  backToPreviousQuestion() {
    if (this.ptrQuestion > 0) {
      if(this.source != undefined && this.playSong)
        this.source.stop();
      this.playSong = false;
      this.displayHint = false;
      this.gameService.previousQuestion()
      this.ptrQuestion--;
      const progressBar = this.progressBar.nativeElement;
      progressBar.children[this.ptrQuestion].classList.add("active")
      progressBar.children[this.ptrQuestion].classList.remove("completed")
      progressBar.children[this.ptrQuestion + 1].classList.remove("active")
    }
  }

  /**
   * Change font for this page
   * @param event 
   */
  changeFont(event) {
    this.elementRef.nativeElement.querySelectorAll(".answerValue").forEach(element => {
      element.setAttribute("style", "font-size:" + (15+parseInt(event.target.value))+ "px;");
    });
    this.elementRef.nativeElement.querySelectorAll(".zoommable").forEach(element => {
      element.setAttribute("style", "font-size:" + (25+parseInt(event.target.value))+ "px;");
    });
  }

  /**
   * change to black the contast for user in the page
   */
  changeContrastToBlack() {
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-black");
    mainContent.classList.remove("contrast-white");
  }

  /**
   * change to white the contast for user in the page
   */
  changeContrastToWhite() {
    var mainContent = document.querySelector("html")
    mainContent.classList.add("contrast-white");
    mainContent.classList.remove("contrast-black");
  }

  /**
   * Play again
   */
  playAgain() {
    this.beginningOfQuiz = true;
    this.isFinishedQuiz = false;
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
      this.stopSong()
    }, 5000)
    this.timerPopup = 5;
  }

  /**
   * Quit te game and return to the quiz list
   */
  quit() {
    this.modalOut = true;
    this.stopSong()
    this._location.back();
  }

  /**
   * Stop the song of the hint
   */
  stopSong(){
    if(this.source != undefined && this.playSong)
      this.source.stop();
  }

  /**
   * Open the side menu for health staff
   */
  switchMenu() {
    if (this.menu == false) {
      this.menu = true;
    } else {
      this.menu = false;
    }
  }

}