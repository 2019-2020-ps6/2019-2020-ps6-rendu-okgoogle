import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';
//router
import { ActivatedRoute } from "@angular/router";
import { Quiz } from 'src/models/quiz.model';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz

  public questionList: Question[] = [];

  ngOnInit() {
    this.setQuestion()
    this.quizService.questions$.subscribe()
  }

  setQuestion(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuestions(id.toString())
    this.quizService.questions$.subscribe((question) =>this.questionList = question);
  }

  constructor(private route: ActivatedRoute,public quizService: QuizService) {

  }

  questionDeletion(obj) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.deleteQuestion(obj.questionNumber.toString()).subscribe(() =>{
       this.questionList.splice(this.questionList.indexOf(obj.question), 1);
    })
  }

}