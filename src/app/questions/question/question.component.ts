import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class questionComponent{

    @Input()
    question: Question;

    @Output()
    questionDeleted: EventEmitter<{question : Question, questionNumber : number}> = new EventEmitter<{question : Question, questionNumber : number}>();

    constructor(){

    }

    deleteQuestion(question :Question, questionNumber : number){
        this.questionDeleted.emit({question, questionNumber});
    }

}
