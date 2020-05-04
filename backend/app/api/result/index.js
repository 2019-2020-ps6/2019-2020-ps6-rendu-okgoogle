const { Router } = require('express')
const { Result } = require('../../models')

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

router.get('/:userid/stat/:resultid', (req, res) => {
  try {
    const result = Result.getById(req.params.resultid) // Construit pour avoir une stat sur un quiz
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {

  try {
    const quiz = req.body.quiz;
    const answers = [];
    
    for(var i = 0; i < quiz.questions.length; i++)
      for(var j = 0; j < quiz.questions[i].answers.length; j++)
        answers.push(quiz.questions[i].answers[j]);

    var nbBonneReponses = 0
    var reponseTotal = 0
    answers.forEach((answer) => {
      if (answer.isCorrect) {
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