import {Question} from './question.model';
import {Answer} from './answer.model';

export interface FinalResult {
  userId: number;
  quizId: number;
  nbErreur: number; // seront incrémenter au fil des reponses
  nbCorrect: number; // seront incrémenter au fil des reponses
  nbAide: number; // seront incrémenter au fil des reponses
  resultQuestions: ResultQuestion[],
  dateJeu: number; 
  dureeJeu: number; //Durée de jeu
}

export interface ResultQuestion {
  question: Question;
  userAnswer: Answer; 
  correctAnswer : Answer;
  questionScore: number; //On va décrementer a chaque erreur ce qui donnera un score
  aideUsed : boolean;
}