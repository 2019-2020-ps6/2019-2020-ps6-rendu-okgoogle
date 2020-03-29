const { Router } = require('express')
const { Result } = require('../../../models')
const logger = require('../../../utils/logger.js')
const { verifyIfAnswerIsCorrect, getCorrectAnswer, buildResult, updateStatistics } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json('GET HTTP method on user resource')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:resultId', (req, res) => {
  try {
    const result = buildResult(req.params.resultId) // Construit pour avoir une stat sur un quiz
    // const result = Result.getById(req.params.resultId)
    logger.info(result)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {

  try {
    
    // Récuperer la liste des answers
    const userId = req.body.userId;
    const quizId = req.body.quizId
    const answers = req.body.answers
    const dureeJeu = req.body.dureeJeu
    const date = req.body.date
    const nbAide = req.body.nbAide
    const dateJeu = req.body.dateJeu

    // Traitement & calcul du score
    // Pour chaque answer on va check si la reponse est juste et calculer les scores
    var nbBonneReponses = 0
    var reponseTotal = 0

    answers.forEach((answer) => {
      reponseTotal += 1
      if (verifyIfAnswerIsCorrect(answer.answerId)) {
        nbBonneReponses += 1
      } else {
        const correctAnswer = getCorrectAnswer(answer.questionId)
        answer.correctAnswerId = correctAnswer
      }
    })

    const nbMauvaiseReponses = reponseTotal - nbBonneReponses;
    const unite = 50

    const maxScore = reponseTotal * unite;
    const userScore = nbBonneReponses * unite;
    userScore += (maxScore - userScore);    

    var tabQuiz = Qui

    // const quizSuccessPercentage = (100 * nbBonneReponses) / reponseTotal;

    // Création & save de l'objet Result
    const result = Result.create({
      ...req.body, maxScore, userScore, nbMauvaiseReponses, nbBonneReponses, nbAide
    });

    // Mise a jour des statistiques
    updateStatistics(userId, result.id, quizSuccessPercentage);

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