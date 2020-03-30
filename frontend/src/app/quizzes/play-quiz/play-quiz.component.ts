import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/result.service';
@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss']
  })
  export class PlayQuizComponent implements OnInit {
    public quiz: Quiz;
    public timer: number = 0;
    private curStatus: string;

    constructor(private route: ActivatedRoute,public quizService: QuizService,private resService: ResultService) {
      setTimeout(()=>{
        const id = this.route.snapshot.paramMap.get('quizid');
        this.quizService.setSelectedQuiz(id.toString());
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
      },300)
      setInterval(()=> {this.timer+=1}, 1000)
    }
  
    ngOnInit() {        
      this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    }
}