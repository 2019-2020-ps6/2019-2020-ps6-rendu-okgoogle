import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    imageUrl: string;
    themeId: string;
    questions: Question[];
    creationDate?: Date;
}
