import {Quiz} from './quiz.model'

export interface Theme {
    id: string;
    name: string;
    imageUrl: string;
    quiz: Quiz[];
}
