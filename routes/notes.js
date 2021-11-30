const notes = require('express').Router();
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
  const noteID = req.params.id
  console.log("DELETE ID", req.params.id)
  readFromFile(jsonFilePath)
  .then((data) => JSON.parse(data))
  .then((json) => {
    // Make a new array of all tips except the one with the ID provided in the URL
    const result = json.filter((note) => note.id !== noteID)
    writeToFile(jsonFilePath, result)
    res.json(`deleted`);
  })
    
  // const filtered = noteDB.filter((note) => {
  //     return note.id !== req.params.id;
  //  })

   
  })



  module.exports = notes;
  