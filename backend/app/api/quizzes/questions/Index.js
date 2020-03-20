
const { Router } = require('express')
const { Question } = require('../../../models')
const erouter = new Router({mergeParams: true})
erouter.post('/', (req, res) => {
  try {
      const newQuestion = req.body;
      newQuestion.quizId = parseInt(req.params.quizId)
      Question.create(newQuestion)
      res.status(201).json(newQuestion)

  } catch (err) {
    if (err.name === 'ValidationError') {
     res.status(400).json(err.extra)
    } else {
    res.status(500).json(err)
    }
  }
 }
)
  erouter.delete('/:quizid',(req,res) =>{
     try{
       res.status(200).json(Question.delete(req.params.quizId))
     }catch (err) {
       res.status(500).json(err)
       }
   })

  erouter.put('/:questionid',(req,res) =>{
    try{
      res.status(200).json(Question.update(req.params.questionsid,req.body))
    }catch(err){
        res.status(500).json(err)
    }
  })

  erouter.get('/',(req,res) =>{
    try {
      res.status(200).json(Question.get())
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  erouter.get('/:quizId',(req,res) =>{
    try {
      res.status(200).json(Question.get())
    } catch (error) {
      res.status(500).json(err)
    }
  })

  module.exports=erouter