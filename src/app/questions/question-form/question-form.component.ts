import {Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent{

    public questionForm: FormGroup;
    public quizTmp : Quiz;

    constructor(private route: ActivatedRoute,public FormB: FormBuilder, public quizService: QuizService){
        this.questionForm = this.FormB.group({
            label: [''],
            answers: this.FormB.array([])
        })
    }
//le component.html pourra avoir acces a laide juste du mot clé answers, get answers creer une sorte de variable ou on peut avoir acces
    get answers(){
        return this.questionForm.get('answers') as FormArray;
    }

    private createAnswer(){
        return this.FormB.group({
            value:'',
            isCorrect: false
        });
    }

    addAnswer(){
        this.answers.push(this.createAnswer());
    }

    addQuestion() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.getQuiz(id.toString()).subscribe((quiz) => this.quizTmp = quiz);
        this.quizService.addQuestion(this.quizTmp, this.questionForm.getRawValue());
    }

    
}