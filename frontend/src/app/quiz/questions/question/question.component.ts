import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Question } from '../../../../models/question.model';
import { QuizService } from 'src/services/quiz.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { ActivatedRoute } from '@angular/router';

import { Mode } from "src/models/mode.enum";
import { Hint } from "src/models/hint.enum";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})

export class questionComponent implements OnInit{

    private curStatus;
    private editanswer_i = -1;
    private _addAnswer = false;
    private edit_question = false;
    public questionForm: FormGroup;
    public answerForm: FormGroup;
    public answerToDelete : Answer;
    private confirmationDeleteQuestion: boolean = false;
    private confirmationDeleteAnswer: boolean = false;
    public modeEnum = Mode;
    public hintEnum = Hint; 
    

    @Input()
    question: Question;

    @Output()
    questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

    @Output()
    questionEdited: EventEmitter<Question> = new EventEmitter<Question>();

    constructor(private quizService: QuizService, private route:ActivatedRoute, private formBuilder:FormBuilder){
        this.curStatus = sessionStorage.getItem("status")
        this.initializeQuestionForm();
    }

    private initializeQuestionForm() {
        this.questionForm = this.formBuilder.group({
          label: [''],
          imgUrl: '',
          indice: [''],
        });
        this.answerForm = this.formBuilder.group({
          imageUrl: '',
          value:[''],
          isCorrect: false,
        })
    }

    ngOnInit(){
        
    }

    supprQuestionC(decision: boolean){
        if(decision)
            this.questionDeleted.emit(this.question);
        else
            this.confirmationDeleteQuestion = false;
    }

    supprQuestionConfirmation(){
        this.confirmationDeleteQuestion = true;
    }

    editQuestion(){
        this.edit_question=true;
        this.questionForm.get('label').setValue(this.question.label)
        this.questionForm.get('indice').setValue(this.question.indice)
        if(this.question.imgUrl != "")
            this.questionForm.get('imgUrl').setValue(this.question.imgUrl)
    }

    validateQuestion(){
        const themeid = this.route.snapshot.paramMap.get('themeid');
        const quizid = this.route.snapshot.paramMap.get('quizid');
        const question = this.questionForm.getRawValue() as Question;
        question.quizId = parseInt(quizid);
        this.quizService.editQuestion(themeid,quizid,this.question.id,question)
        this.edit_question = false;
    }

    cancelQuestion(){
        this.edit_question = false;
    }

    editAnswer(answer:Answer,i:number){
        this.editanswer_i = i;
        this.answerForm.get('value').setValue(answer.value)
        if(answer.imageUrl)
            this.answerForm.get('imageUrl').setValue(answer.imageUrl)
        this.answerForm.get('isCorrect').setValue(answer.isCorrect)
    }


    validateAnswer(answerAModifier:Answer){
        this.editanswer_i = -1;
        const themeid = this.route.snapshot.paramMap.get('themeid');
        const quizid = this.route.snapshot.paramMap.get('quizid');
        const answer = this.answerForm.getRawValue() as Answer;
        if(answer.imageUrl.trim() === ""){
            answer.imageUrl = answerAModifier.imageUrl
        }
        this.quizService.editAnswer(themeid,quizid,this.question.id,answerAModifier.id, answer);
    }
    cancelAnswer(){
        this.editanswer_i = -1;
    }


    supprAnswer(answer: Answer,confirmationDelete: boolean){
        if(confirmationDelete){
            const themeid = this.route.snapshot.paramMap.get('themeid');
            const quizid = this.route.snapshot.paramMap.get('quizid');
            this.quizService.deleteAnswer(themeid,quizid,this.question.id.toString(), answer.id);
            this.confirmationDeleteAnswer = false;
        }
        else{
            this.confirmationDeleteAnswer = false;
        }        
    }
    supprAnswerConfirmation(answer : Answer){
        this.confirmationDeleteAnswer = true;
        this.answerToDelete = answer;
    }

    addAnswer(){
        if(this.editanswer_i != -1)
            this.editanswer_i = -1;
        this._addAnswer = true;
    }

    createAnswer(){
        this._addAnswer = false;
        const themeid = this.route.snapshot.paramMap.get('themeid');
        const quizid = this.route.snapshot.paramMap.get('quizid');
        const answer = this.answerForm.getRawValue() as Answer;
        this.quizService.addAnswer(themeid,quizid,this.question.id.toString(),answer);
    }

    cancelCreateAnswer(){
        this._addAnswer = false;
    }
}
