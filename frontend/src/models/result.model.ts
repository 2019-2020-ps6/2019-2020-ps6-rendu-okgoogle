import {Question} from './question.model';
import {Answer} from './answer.model';

export interface Result {
  userId: string; //ICI
  quizId: string;//ICI
  nbErreur: number; // seront incrémenter au fil des reponses //Backend
  nbCorrect: number; // seront incrémenter au fil des reponses //Backend
  nbAide: number; // seront incrémenter au fil des reponses //ICI
  answers: Answer[], //ICI
  dateJeu: string; //ICI
  dureeJeu: number; //Durée de jeu ICI
}