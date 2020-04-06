import {Answer} from './answer.model';
import { Question } from './question.model';

export interface Result {
  id: string;
  userId: string; //ICI
  quizId: string;//ICI
  nameQuiz: string;
  dateQuiz: string;
  nbErreur: number; // seront incrémenter au fil des reponses //Backend
  nbCorrect: number; // seront incrémenter au fil des reponses //Backend
  nbAide: number; // seront incrémenter au fil des reponses //ICI
  questions: Question[], //ICI
  answers: Answer[], //ICI
  dateJeu: string; //ICI
  dureeJeu: number; //Durée de jeu ICI
}