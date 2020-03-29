const { Answer } = require('../../../models')

const isCorrectAnswerOrNot = (answerId) => {
    const answer = Answer.getById(answerId)
    return answer.isCorrect
  }

  module.exports = {
    isCorrectAnswerOrNot
}