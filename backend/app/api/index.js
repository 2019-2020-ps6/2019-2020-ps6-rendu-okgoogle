const { Router } = require('express')
const ThemesRouter = require('./themes')
const UsersRouter = require('./users')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/themes', ThemesRouter)
router.use('/users', UsersRouter)

module.exports = router
