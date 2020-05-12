const { Router } = require('express')
const { Answer, Quiz, Question } = require('../../../../models')
const manageAllErrors = require('../../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const { filterQuestionsFromQuizz, getQuestionFromQuiz } = require('./manager')
var fs = require('fs')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, __dirname+"../../../../../../../frontend/src/assets/sons")
      cb(null,"app/api/uploads/sons")
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});

var upload = multer({storage: storage});

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {

    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)

    let question = Question.create({label: req.body.label, imgUrl: req.body.imgUrl,sonUrl: req.body.sonUrl, indice: req.body.indice,quizId})

    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = {...question, answers}
    }
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.post('/fileUpload', upload.single('son'), (req, res) => {
  try {
    res.status(201).json("Fichier upload")
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.get('/getFileUpload/:questionid', function (req, res, next) {
  var fileName = req.params.questionid
  res.set('Content-Type', 'audio/mpeg');
  res.status(200).send(fs.readFileSync(__dirname+"/../../../uploads/sons/"+fileName))
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    let updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, imgUrl: req.body.imgUrl,indice: req.body.indice, quizId: question.quizId })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url. 
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router
