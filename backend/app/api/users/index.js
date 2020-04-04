const { Router } = require('express')

const { User } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(User.get())
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:userId', (req, res) => {
    try {
        res.status(200).json(User.getById(req.params.userId))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:userId', (req, res) => {
    try {
        User.delete(req.params.userId)
        res.status(200).json()
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:userId', (req, res) => {
    try {
        const user = User.update(req.params.userId, req.body)
        console.log(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        const quiz = User.create(req.body)
        res.status(201).json(quiz)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
})

module.exports = router;