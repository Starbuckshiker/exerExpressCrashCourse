const express = require('express');
const path = require('path');
const members = require('./Members');

const app = express();

const logger = (req, res, next) => {
    console.log('Let it Snow');
    next();
}
// Init middleware
app.use(logger);

// Gets All Members
app.get('/api/members', (req, res) =>  res.json(members));

//first part of course
// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Chris!!</h1>');  
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));