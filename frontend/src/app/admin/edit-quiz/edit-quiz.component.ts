import {Component, OnInit, Input} from '@angular/core'
import {QuizService} from '../../../services/quiz.service'
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from 'src/models/question.model';

/**
 * Recupere un quiz avec plusieurs questions
 */

@Component({
    selector:'app-edit-quiz',
    templateUrl: './edit-quiz.component.html',
    styleUrls: ['./edit-quiz.component.scss']  
})

export class editQuizComponent implements OnInit{


  public quiz: Quiz;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { 
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    console.log(this.quiz)
  }

  ngOnInit() {
    
  }
}