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

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.quizService.getQuestions(id.toString()).subscribe((question) =>{
      this.questionList = question;
    })
  }

  constructor(private route: ActivatedRoute,public quizService: QuizService) {


  }



  


}