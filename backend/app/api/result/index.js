const { Router } = require('express')
const { Result } = require('../../models')
const { isCorrectAnswerOrNot } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Result.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userid', (req, res) => {
  try {
    const result = Result.getByUserId(req.params.userid) // Construit pour avoir une stat sur un quiz
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:userid/details/:resultid', (req, res) => {
  try {
    const result = Result.getById(req.params.resultid) // Construit pour avoir une stat sur un quiz
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {

  try {
    const answers = req.body.answers
    var nbBonneReponses = 0
    var reponseTotal = 0
    answers.forEach((answer) => {
      if (isCorrectAnswerOrNot(answer.id)) {
        nbBonneReponses += 1
      } 
      reponseTotal++;
    })
    const nbMauvaiseReponses = reponseTotal - nbBonneReponses;

    const result = Result.create({...req.body, nbErreur: nbMauvaiseReponses,nbCorrect: nbBonneReponses});

    res.status(201).json(result)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router