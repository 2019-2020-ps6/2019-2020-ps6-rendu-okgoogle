const { Router } = require('express')

const { Question } = require('../../../models')

const AnswerRouter = require('./answers')

const router = new Router({mergeParams: true})

router.get('/', (req, res) => {
    try {
      res.status(200).json(Question.get())
    } catch (err) {
      res.status(500).json(err)
    }
  })

router.get('/:questionId', (req, res) =>{
  try{
    const question = Question.getById(req.params.questionId)
    res.status(200).json(question)
  }catch(err){
    res.status(500).json(err)
  }
})
  
  router.delete('/:questionId', (req, res) => {
    try {
        Question.delete(req.params.questionId)
      res.status(200).json()
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  router.put('/:questionId', (req, res) => {
    try {
      const quiz = Question.update(req.params.questionId, req.body)
      res.status(200).json(quiz)
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const newQuestion = req.body;//Le JSON
      newQuestion.quizId = parseInt(req.params.quizid);
      const quiz = Question.create(newQuestion);

      res.status(201).json(quiz)
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
  })

router.use("/:questionId/answers",AnswerRouter)

module.exports = router;