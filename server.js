const express = require('express');
const app = express();
//bring in all of the data routes
const api = require('./routes/apiRoutes.js');
const PORT = process.env.PORT || 3001;
const path = require('path')




// Sets up the Express app to handle data parsing. Need to have on all api calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//add api to all of data routes 
app.use('/api', api);

app.use(express.static('public'));

//First route to main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

//Second route to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });


// PORT
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

