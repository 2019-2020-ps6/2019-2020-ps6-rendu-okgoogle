const { Router } = require('express')
const ThemesRouter = require('./themes')
const QuizzesRouter = require('./themes/quizzes')
const UsersRouter = require('./users')
const ResultRouter = require('./result')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/themes', ThemesRouter)
router.use('/quizzes', QuizzesRouter)
router.use('/users', UsersRouter)
router.use('/result', ResultRouter)

module.exports = router
