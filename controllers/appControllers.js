const path = require('path');

const notesPage = (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))

const indexPage = (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))

module.exports = {
    notesPage,
    indexPage
  }