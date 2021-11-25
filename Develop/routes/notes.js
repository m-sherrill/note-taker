const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });


notes.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });

  // Retrieves a note with specific id
  notes.get("/notes/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
});

}
  module.exports = notes;
  