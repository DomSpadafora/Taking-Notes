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





//Creates the Server 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);