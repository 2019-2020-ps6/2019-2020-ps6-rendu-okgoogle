import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class questionComponent implements OnInit{

    @Input()
    question: Question;

    @Output()
    questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

    constructor(){
        
    }

    ngOnInit(){
        
    }

    deleteQuestion(){
        this.questionDeleted.emit(this.question);
    }

}
