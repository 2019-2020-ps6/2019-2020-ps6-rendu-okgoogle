const { Router } = require('express')

const { Theme, Quiz } = require('../../models/')

const QuizRouter = require('./quizzes')
const { buildTheme, buildThemes } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const themes = buildThemes()
    res.status(200).json(themes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:themeid', (req, res) => {
  try {
    const theme = buildTheme(req.params.themeid);
    res.status(200).json(theme);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:themeid', (req, res) => {
  try {
    Theme.delete(req.params.themeid)
    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:themeid/quizzes/', (req, res) => {
  try {
    res.status(200).json(Quiz.get().filter((quiz)=> quiz.themeId === req.params.themeid));
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.put('/:themeid', (req, res) => {
  try {
    const theme = Theme.update(req.params.themeid, req.body)
    res.status(200).json(theme)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const theme = Theme.create({ ...req.body })
    res.status(201).json(theme)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use("/:themeid/quizzes/",QuizRouter)

module.exports = router
