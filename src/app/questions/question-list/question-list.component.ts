import { Component, OnInit, ɵConsole } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';
//router
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  public questionList: Question[] = [];

  constructor(private route: ActivatedRoute,public quizService: QuizService) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.quizzes$.subscribe((quiz) => {
      console.log(quiz)
      for (let index = 0; index < quiz.length; index++) {
        if(quiz[index].id.toString() === id.toString()){
          console.log(quiz[index].questions)
          this.questionList = quiz[index].questions;
        }
      }
    });
    console.log(this.questionList)

  }

  ngOnInit() {
  }

  


}