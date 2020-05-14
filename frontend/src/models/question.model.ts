import {Answer} from './answer.model'

export interface Question {
    id: string;
    label: string;
    imgUrl?: string;
    sonUrl: string;
    indice:string;
    aideUtilise?:boolean;
    answers: Answer[];
    quizId: number;
}