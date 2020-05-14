const { Theme } = require('../../models')

const { filterQuizFromTheme } = require('./quizzes/manager')
/**
 * Function buildTheme.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param themeId
 */
const buildTheme = (themeId) => {
    const theme = Theme.getById(themeId.toString())
    const quizs = filterQuizFromTheme(themeId)
    return { ...theme, quiz: quizs }
}

/**
 * Function buildThemes.
 * This function build entire themes.
 */
const buildThemes = () => {
    const themes = Theme.get();
    return themes.map((theme) => buildTheme(theme.id.toString()))
} 

module.exports = {
    buildTheme,
    buildThemes
}