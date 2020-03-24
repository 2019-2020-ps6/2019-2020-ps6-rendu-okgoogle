import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    themeId: number;
    questions: Question[];
    creationDate?: Date;
}
