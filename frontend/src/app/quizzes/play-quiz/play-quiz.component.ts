import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/result.service';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
@Component({
    selector: 'app-play-quiz',
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.scss']
  })
  export class PlayQuizComponent implements OnInit {
    public quiz: Quiz;
    public questionSelected: Question;
    private curStatus: string;

    constructor(private route: ActivatedRoute,public quizService: QuizService,private resService: ResultService) {      
      this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
      this.resService.questionSelected$.subscribe((question) => this.questionSelected = question)
    }
  
    ngOnInit() {    
        const id = this.route.snapshot.paramMap.get('quizid');
        this.quizService.setSelectedQuiz(id.toString());
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
        this.resService.questionSelected$.subscribe((question) => this.questionSelected = question)        
    }

    selectAnswer(answer: Answer){
      this.resService.setSelectedAnswer(this.questionSelected.id.toString(),answer.id.toString())
    }

    aide(){
      this.resService.GiveClues()
    }

    
}