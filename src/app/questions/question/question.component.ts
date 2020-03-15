import {Component, Input, Output} from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class questionComponent{

    @Input()
    question: Question;


    constructor(){

    }


}
