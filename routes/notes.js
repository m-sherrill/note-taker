const notes = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const noteDB = require("../db/notes.json")

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

notes.delete("/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "../db/notes.json");
    // request to delete note by id.
    for (let i = 0; i < noteDB.length; i++) {

        if (noteDB[i].id == req.params.id) {
            noteDB.splice(i, 1);
            break;
        }
    }
    writeToFile(jsonFilePath, noteDB, function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(noteDB);
});



  module.exports = notes;
  