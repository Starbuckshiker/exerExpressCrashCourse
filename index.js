
const express = require('express');
const uuid = require('uuid');
const path = require('path');
//const logger = require('./middleware/logger');


const app = express();

const logger = (req, res, next) => {
    console.log(
        `${req.protocol}://${req.get('host')}${
            req.orginalUrl
        }: ${moment().format()}`
    );
    next();
};

// Init middleware
//app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//first part of course
// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Chris!!</h1>');  
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members APi Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
