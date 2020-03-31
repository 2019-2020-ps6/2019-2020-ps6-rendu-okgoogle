import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss']
})
export class editAnswerComponent implements OnInit {

    public answer: Answer;
    public question: Question;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { 
      setTimeout(()=> {
        const id = this.route.snapshot.paramMap.get('answerid');
        this.quizService.setSelectedAnswer(id.toString());
        this.quizService.answerSelected$.subscribe((answer) => this.answer = answer);
      },10)

  }
  
  ngOnInit() {
    
  }

}