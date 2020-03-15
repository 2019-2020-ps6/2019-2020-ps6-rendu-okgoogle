import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

export const QUESTION_ACTOR: Question = {
    label: 'Jean Gabin a joué dans...',
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ],
    quizId: 1582393505804
};

export const QUESTION_SPORT: Question = {
    label: 'Qui était Rocky de Rocky Marciano.',
    answers: [
        {
            value: 'Un acteur',
            isCorrect: false,
        },
        {
            value: 'Un boxeur',
            isCorrect: true,
        }
    ],
    quizId: 1582393505804
};

export const QUIZ_LIST: Quiz[] = [
    {
        id:"1",
        name: 'Les Acteurs', // What's happening if I change this value..?
        theme: 'Actor',
        questions: [QUESTION_ACTOR],
    },
    {
        id:"2",
        name: 'Les Sports',
        questions: [QUESTION_SPORT],
    }
];
