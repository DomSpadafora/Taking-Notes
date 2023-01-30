const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')
const fs = require('fs');


const app = express();
const PORT = 3001;

//middleware for serving static assets
app.use(express.static('public'));

// Sets up the Express app to handle data parsing. Need to have on all api calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//First route to main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

//Second route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

//getting fetch from front end and taking json data and sending it back
app.get('/api/notes', (req, res) => res.json(noteData));





//creating post request for 'adding a new note' and sending back***activity 13/15***
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  console.log(req.body)

  // Prepare a response object to send back to the client
  const { title, text, id} = req.body;

  // Check if there is anything in the response body
  if (req.body && req.body.text) {
   const newNote = {
      title,
      text,
      review_id: uuid(),
    };
    readAndAppend(newNote, './db/db.json')
    res.json(newNote);
  } else {
    res.json('Request body must at least contain content');
  }




  // Log the response body to the console
  console.log(req.body);
});



//Creates the Server 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);