const fb = require('express').Router();
const { readFromFile, readAndAppend, deleteNote} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the notes
fb.get('/notes', (req, res) => {
    console.info(`${req.method} input received for new note`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
// POST Route for submitting feedback
fb.post('/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit feedback`);
  
    // Destructuring assignment for the items in req.body
    const { title, text, } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json', res);
    } 
});

fb.delete('/notes/:id', (req, res) => {
  deleteNote(req.params.id, './db/db.json', res)
});



  
  module.exports = fb;