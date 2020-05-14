const { Quiz } = require('../../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
    const quiz = Quiz.getById(quizId)
    const questions = filterQuestionsFromQuizz(quiz.id)
    const questionWithAnswers = questions.map((question) =>  {
        const answers = filterAnswersFromQuestion(question.id)
        return { ...question, answers: answers }
    })
    return { ...quiz, questions: questionWithAnswers }
}

/**
 * filterQuizFromTheme.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId 
 */
const filterQuizFromTheme = (themeId) => {
    const quizs = Quiz.get()
    const quizzes = quizs.filter((quiz) => quiz.themeId.toString() === themeId) //quizs du themes concerné sans questions
    const quizsBuild = quizzes.map((quiz)=> buildQuizz(quiz.id))// va modifier chaque quiz pour utiliser le retour de buildQUizz
    return quizsBuild
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
    const quizzes = Quiz.get();
    return quizzes.map((quiz) => buildQuizz(quiz.id))
} 

module.exports = {
    buildQuizz,
    filterQuizFromTheme,
    buildQuizzes
}