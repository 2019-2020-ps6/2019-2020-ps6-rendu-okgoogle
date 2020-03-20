const { Router } = require('express')

const { Answer, Question } = require('../../../../models')

const router = new Router({mergeParams: true})


router.get('/', (req, res) => {
  try {
    res.status(200).json(Answer.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:answerId', (req, res) =>{
  try{
    const answer = Answer.getById(req.params.answerId)
    res.status(200).json(answer)
  }catch(err){
    res.status(500).json(err)
  }
})
  
  router.delete('/:answerId', (req, res) => {
    try {
      Answer.delete(req.params.answerId)
      res.status(200).json("Removed!")
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  router.put('/:answerId', (req, res) => {
    try {
      const answer = Answer.update(req.params.answerId, req.body)
      res.status(200).json(answer)
    } catch (err) {
      res.status(500).json(err)
    }
  })
  
  router.post('/', (req, res) => {
    try {
      const newAnswer = req.body;//Le JSON
      const answer = Answer.create(newAnswer)

      res.status(201).json(answer)
    } catch (err) {
        console.log(err)
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
  })

module.exports = router;