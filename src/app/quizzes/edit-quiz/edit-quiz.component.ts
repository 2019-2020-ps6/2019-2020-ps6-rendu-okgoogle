import {Component, OnInit} from '@angular/core'
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
    public quizTmp : Quiz;

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.quizzes$.subscribe((quiz) => {
            for(var i in quiz){
                if(quiz[i].id.toString() === id.toString()){
                    this.quizTmp = quiz[i]
                    this.quizService.questions$.subscribe(data => { // subscribe once to the data stream
                        this.quizTmp.questions = data;
                    })
                }
            }
        })
    }

    constructor(private router: Router,private route: ActivatedRoute, private quizService: QuizService){


    }


}