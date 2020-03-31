import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Question } from '../../../models/question.model';
import { Answer } from 'src/models/answer.model';
import { ResultService } from 'src/services/result.service';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class questionComponent implements OnInit{

    private curStatus

    @Input()
    question: Question;

    @Output()
    questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

    @Output()
    questionEdited: EventEmitter<Question> = new EventEmitter<Question>();

    constructor(private resultService: ResultService){
        this.curStatus = sessionStorage.getItem("status")
    }

    ngOnInit(){
        
    }

    deleteQuestion(){
        this.questionDeleted.emit(this.question);
    }

    editQuestion(){
        this.questionEdited.emit(this.question)
    }

}
