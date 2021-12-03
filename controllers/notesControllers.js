const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const jsonFilePath = path.join(__dirname, "../db/notes.json")

const getNotes = (req, res) => {
    readFromFile(jsonFilePath).then((data) => res.json(JSON.parse(data)))
  }

const postNotes = (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, jsonFilePath);
      res.json(`note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  }

const getNotesByID = (req,res) => {
    readFromFile(jsonFilePath).then((data) => res.json(JSON.parse(req.params.id)));
}

const deleteNote = (req, res) => {
    const noteID = req.params.id
    readFromFile(jsonFilePath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteID)
      writeToFile(jsonFilePath, result)
      res.json(`deleted`);
    })
    }


    module.exports = {
        getNotes, 
        postNotes, 
        getNotesByID, 
        deleteNote
      }