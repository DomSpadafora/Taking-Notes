const express = require('express');
const path = require('path');
const noteData = require('./db/db.json')
const fs = require('fs')

const app = express();
const PORT = 3001;

//middleware for serving static assets
app.use(express.static('public'));


//get 
app.get('/api/terms', (req, res) => res.json(termData));







//Creates the Server 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);