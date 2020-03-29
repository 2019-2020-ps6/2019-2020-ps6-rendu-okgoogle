const { Router } = require('express')
const { Result } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/:resultId', (req, res) => {
  try {
    const result = Result.getById(req.params.resultId) // Construit pour avoir une stat sur un quiz
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {

  try {
    const answers = req.body.answers
    const nbAide = req.body.nbAide

    var nbBonneReponses = 0
    var reponseTotal = 0

    answers.forEach((answer) => {
      if (isCorrectAnswer(answer.answerId)) {
        nbBonneReponses += 1
      } 
      reponseTotal++;
    })

    const nbMauvaiseReponses = reponseTotal - nbBonneReponses;

    const result = Result.create({...req.body, maxScore, userScore, nbMauvaiseReponses, nbBonneReponses, nbAide});

    res.status(201).json(result)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
const isCorrectAnswer = (answerId) => {
  // Methode qui check si la réponse choisi est la bonne
  const answer = Answer.getById(answerId)
  return answer.isCorrect
}

module.exports = router