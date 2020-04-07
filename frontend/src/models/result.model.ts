import {Answer} from './answer.model';
import { Question } from './question.model';

export interface Result {
  id: string;
  userId: string;
  quizId: string;
  nameQuiz: string;
  dateQuiz: string;
  nbErreur: number; 
  nbCorrect: number
  nbAide: number; 
  questions: Question[],
  answers: Answer[],
  dateJeu: string;
  dureeJeu: number;
}