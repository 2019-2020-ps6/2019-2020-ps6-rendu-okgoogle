import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Question } from '../../../models/question.model';
//router
import { ActivatedRoute, Router } from "@angular/router";
import { Quiz } from 'src/models/quiz.model';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz:Quiz

  constructor(private route: ActivatedRoute, private router:Router, public quizService: QuizService) {
  }

  ngOnInit(){

  }

  questionDeletion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
    this.quiz.questions.splice(this.quiz.questions.indexOf(question),1)
  }
  // questionDeletion(question: Question) {
  //   const id = +this.route.snapshot.paramMap.get('id');

    
  //   this.quizService.deleteQuestion(obj.questionNumber.toString()).subscribe(() =>{
  //      this.quizService.quizSelected.questions.splice(this.quizService.quizSelected.questions.indexOf(obj.question), 1);
  //   })
  // }

  questionEdition(selected: Question){
    this.router.navigate(["/edit-question/",selected.id.toString()]) 
  }
}