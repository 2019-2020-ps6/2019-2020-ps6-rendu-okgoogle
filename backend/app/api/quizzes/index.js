const { Router } = require('express')

const { Quiz, Question, Answer } = require('../../models/')

const QuestionRouter = require('./questions')
const AnswerRouter = require('./questions/answers')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Quiz.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizid', (req, res) => {
  try {
    const quiz =Quiz.getById(req.params.quizid);
    
    res.status(200).json({...quiz, questions : Question.get().filter(
      //On va utiliser filter qui va implémenter une fonction anonyme pour trier et ranger les données
      question => {
        question.quizId === parseInt(req.params.quizid);
        //on va filtrer les données recu en ne retournant QUE les elements dont l'id est egale a l'id de la question
        question.answers = Answer.get().filter(answer =>{
          if(answer.questionId == question.id){
            return answer;
          }
        })
        return question;
      }
    )
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:quizid', (req, res) => {
  try {
    Quiz.delete(req.params.quizid)
    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizid', (req, res) => {
  try {
    const quiz = Quiz.update(req.params.quizid, req.body)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
router.use("/:quizid/questions",QuestionRouter)
router.use("/:quizid/questions/:questionid/answers",AnswerRouter)
module.exports = router
