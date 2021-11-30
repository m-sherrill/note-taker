const notesControllers = require('../controllers/notesControllers')
const notes = require('express').Router();

notes.get('/', notesControllers.getNotes)
notes.post('/', notesControllers.postNotes)
notes.get("/:id", notesControllers.getNotesByID)
notes.delete('/:id', notesControllers.deleteNote)

module.exports = notes
  