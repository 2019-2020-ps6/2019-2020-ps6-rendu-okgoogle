//Creation du component
import {Component, OnInit} from '@angular/core'
//Service
import {QuizService} from '../../../services/quiz.service'
//Model
import { Quiz } from '../../../models/quiz.model';
//router
import { ActivatedRoute } from "@angular/router";
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

    public quizzes : Quiz[] = [];
    public quizTmp : Quiz;
    public questionTmp : Question[] = [];

    ngOnInit(): void {
        this.getQuiz();
    }

    constructor(private route: ActivatedRoute, private quizService: QuizService){
        console.log("testInit")
        
        this.getQuiz()
        this.getQuestions()
        this.mergeQuestionsWithQuiz()
    }

    getQuiz() : void{

        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.quizzes$.subscribe((quiz) => this.quizzes = quiz);
        this.quizzes.filter((quiz) =>{

            //on a bien le quiz ici
            console.log(quiz)
            //QuizTmp ne s'affecte pas
            this.quizTmp = quiz
            console.log(quiz.id.toString() === id.toString())
            return quiz.id.toString() === id.toString()
        });
        console.log(this.quizTmp)
    }
    // getQuiz() : void{
    //     this.quizService.quizzes$.subscribe((quiz) => this.quizzes = quiz);
    //     const id = +this.route.snapshot.paramMap.get('id');
    //     console.log(id)

    //     this.quizzes.filter((quiz) =>{

    //         //on a bien le quiz ici
    //         console.log(quiz)
    //         //QuizTmp ne s'affecte pas
    //         this.quizTmp = quiz
    //         console.log(quiz.id.toString() === id.toString())
    //         return quiz.id.toString() === id.toString()
    //     });
    //     this.quizTmp = this.quizzes[0];
    //     console.log(this.quizTmp)
        
    //     // this.quizService.getQuiz(id.toString()).subscribe((quiz) => {
    //     //     console.log("ezsdé")
    //     //     console.log(quiz)
    //     //     this.quizTmp = quiz
    //     // });
    // }

    getQuestions(): void{
        const id = +this.route.snapshot.paramMap.get('id');
        this.quizService.getQuestions(id.toString()).subscribe((question)=>{
            this.questionTmp = question
        })
    }

    mergeQuestionsWithQuiz(): void{
        this.quizTmp.questions = this.questionTmp
    }

    // getQuestion(quiz : Quiz): Question[]{
    //     const id = +this.route.snapshot.paramMap.get('id');
    //     return this.quizService.getQuestions(quiz.id.toString())
    // }

}


// //Creation du component
// import {Component, OnInit} from '@angular/core'
// //Service
// import {QuizService} from '../../../services/quiz.service'
// //Model
// import { Quiz } from '../../../models/quiz.model';
// //router
// import { ActivatedRoute } from "@angular/router";
// import { Question } from 'src/models/question.model';

// /**
//  * Recupere un quiz avec plusieurs questions
//  */

// @Component({
//     selector:'app-edit-quiz',
//     templateUrl: './edit-quiz.component.html',
//     styleUrls: ['./edit-quiz.component.scss']  
// })

// export class editQuizComponent implements OnInit{

//     public quizzes : Quiz[];
//     public quizTmp : Quiz;
//     public questionTmp : Question[] = [];

//     ngOnInit(): void {
//         this.getQuiz();
//     }

//     constructor(private route: ActivatedRoute, private quizService: QuizService){
//         console.log("testInit")
//         this.quizService.quizzes$.subscribe((quiz) => this.quizTmp = quiz);
//         this.getQuiz()
//         this.getQuestions()
//         this.mergeQuestionsWithQuiz()
//     }

//     getQuiz() : void{
//         const id = +this.route.snapshot.paramMap.get('id');
//         console.log(id)
//         this.quizService.getQuiz(id.toString()).subscribe((quiz) => {
//             console.log("ezsdé")
//             console.log(quiz)
//             this.quizTmp = quiz
//         });
//     }

//     getQuestions(): void{
//         const id = +this.route.snapshot.paramMap.get('id');
//         this.quizService.getQuestions(id.toString()).subscribe((question)=>{
//             this.questionTmp = question
//         })
//     }

//     mergeQuestionsWithQuiz(): void{
//         this.quizTmp.questions = this.questionTmp
//     }

//     // getQuestion(quiz : Quiz): Question[]{
//     //     const id = +this.route.snapshot.paramMap.get('id');
//     //     return this.quizService.getQuestions(quiz.id.toString())
//     // }

// }