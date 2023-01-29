const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')
const fs = require('fs')

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

//getting fetch from front end and taking json data and sending it back
app.get('/api/notes', (req, res) => res.json(noteData));

//creating post request for api/notes
app.post('/api/notes', (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);

  // Show the user agent information in the terminal
  console.info(req.rawHeaders);

  // Log our request to the terminal
  console.info(`${req.method} request received`);
});



//Creates the Server 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);