
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const exphbs = require('express-handlebars');
//const logger = require('./middleware/logger');
const members = require('./Members');


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

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage route
app.get('/', (req, res) => 
res.render('index', {
    title: 'Member App',
    members
})
);

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//first part of course
// app.get('/', (req, res) => {
//     //res.send('<h1>Hello Chris!!</h1>');  
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Members APi Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
