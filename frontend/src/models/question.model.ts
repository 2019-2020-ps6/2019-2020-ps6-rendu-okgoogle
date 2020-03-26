import {Answer} from './answer.model'

export interface Question {
    id: number;
    label: string;
    answers: Answer[];
    quizId: number;
}
