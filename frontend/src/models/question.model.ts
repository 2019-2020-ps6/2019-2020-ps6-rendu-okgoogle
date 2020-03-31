import {Answer} from './answer.model'

export interface Question {
    id: string;
    label: string;
    indice:string;
    answers: Answer[];
    quizId: number;
}