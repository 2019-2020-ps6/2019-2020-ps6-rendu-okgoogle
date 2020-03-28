import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { QuizService } from 'src/services/quiz.service';
@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss']
  })
  export class PlayQuizComponent implements OnInit {
    public quiz: Quiz;
    private curStatus: string;

    constructor(public quizService: QuizService) {
      
    
    }
  
    ngOnInit() {
      setTimeout(() => {
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    console.log(this.quiz)
        }, 2000);
    }
}