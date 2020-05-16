import { Quiz } from './quiz.model';

export interface Result {
  id: string;
  userId: string;
  quiz: Quiz;
  nbErreur: number; 
  nbCorrect: number
  nbAide: number;
  dateJeu: string;
}