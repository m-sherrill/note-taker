const notes = require('express').Router();
const lodash = require('lodash')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const noteDB = require("../db/notes.json")

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

 
  // Retrieves a note with specific id
  notes.get("/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(req.params.id)));
});


notes.delete('/:id', function (req, res) {
  let jsonFilePath = path.join(__dirname, "../db/notes.json")
    console.log("DELETE ID", req.params.id)
    const filtered = noteDB.filter((note) => {
      return note.id !== req.params.id;
   })
    console.log(filtered)
    writeToFile(jsonFilePath, filtered)
    res.json(noteDB)
  })



  module.exports = notes;
  