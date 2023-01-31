const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
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
        userId: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      res.json(newNote);
    } 
});

fb.delete('/notes/:id', (request, response) => {

    // Fetched id to delete
    let noteId = request.params.id.toString();
    
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    // Read data from 'db.json' file
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    // filter data to get notes except the one to delete
    const newData = data.filter( note => note.id.toString() !== noteId );

    // Write new data to 'db.json' file
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    
    console.log(`\nSuccessfully deleted note with id : ${noteId}`);

    // Send response
    response.json(newData);
});
  
  module.exports = fb;